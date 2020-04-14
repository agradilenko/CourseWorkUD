const db = require("../models");
const Order = db.orders;
const Op = db.Sequelize.Op;

// Create and Save new Order
exports.create = (req, res) => {
    // Validate request
    if (!req.body.orderId) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Create new Order
    const order = {
        orderId: req.body.orderId,
        clientId: req.body.clientId,
        deliveryId: req.body.deliveryId,
        deliveryCost: req.body.deliveryCost
    };
    // Save Order in the database
    Order.create(order)
        .then(data => {
            res.redirect('/api/orders');
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Order."
            })
        })
};

// Retrieve all Orders
exports.retrieveAll = (req, res) => {
    Order.findAll()
        .then(orders => res.render('orders', {
            orders
        }))
        .catch(err => console.log(err));
};

//Search by the clientId in the request
exports.searchOrder = (req, res) => {
    let clientId = req.query.clientId;
    Order.findAll({ where: { clientId: { [Op.like]: '%' + clientId + '%' } } })
        .then(orders => res.render('orders', { orders }))
        .catch(err => console.log(err));
};

// Update a Order by the id in the request
exports.update = (req, res) => {
    const orderId = req.params.orderId;

    Order.update(req.body, {
        where: { orderId: orderId }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Order was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Order with id=${orderId}. Maybe Order was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Order with id=" + orderId
            });
        });
};

// Delete a Order with the specified id in the request
exports.delete = (req, res) => {
    const orderId = req.params.orderId;

    Order.destroy({
        where: { orderId: orderId }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message:   "Order was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Order with id=${orderId}. Maybe Order was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Order with id=" + orderId
            });
        });
};

// Delete all Orders from the database.
exports.deleteAll = (req, res) => {
    Order.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Orders were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all orders."
            });
        });
};
