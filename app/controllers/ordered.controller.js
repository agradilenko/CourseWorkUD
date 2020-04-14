const db = require("../models");
const Ordered = db.ordered;
const Op = db.Sequelize.Op;

// Create and Save new Ordered
exports.create = (req, res) => {
    // Validate request
    if (!req.body.orderId) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Create new Ordered
    const ordered = {
        orderId: req.body.orderId,
        productId: req.body.productId,
        quantity: req.body.quantity,
        discountId: req.body.discountId
    };
    // Save Ordered in the database
    Ordered.create(ordered)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Ordered."
            })
        })
};

// Retrieve all Ordered
exports.retrieveAll = (req, res) => {
    Ordered.findAll()
        .then(ordered => res.render('ordered', {
            ordered
        }))
        .catch(err => console.log(err));
};

//Search by the orderId in the request
exports.searchOrdered = (req, res) => {
    let orderId = req.query.orderId;
    Ordered.findAll({ where: { orderId: orderId  }})
        .then(ordered => res.render('ordered', { ordered }))
        .catch(err => console.log(err));
};

// Update a Ordered by the id in the request
exports.update = (req, res) => {
    const orderId = req.params.orderId;

    Ordered.update(req.body, {
        where: { orderId: orderId }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Ordered was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Ordered with id=${orderId}. Maybe Product was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Ordered with id=" + orderId
            });
        });
};

// Delete a Ordered with the specified id in the request
exports.delete = (req, res) => {
    const orderId = req.params.orderId;

    Ordered.destroy({
        where: { orderId: orderId }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message:   "Ordered was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Ordered with id=${orderId}. Maybe Ordered was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Ordered with id=" + orderId
            });
        });
};

// Delete all Ordered from the database.
exports.deleteAll = (req, res) => {
    Ordered.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Ordered were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all ordered."
            });
        });
};
