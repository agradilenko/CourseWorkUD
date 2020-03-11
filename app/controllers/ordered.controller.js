const db = require("../models");
const Ordered = db.ordered;
const Op = db.Sequelize.Op;

// Create and Save new Ordered
exports.create = (req, res) => {
    // Validate request
    if (!req.body.orderedId) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Create new Ordered
    const ordered = {
        orderedId: req.body.orderedId,
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

// Retrieve all Ordered from the database.
exports.findAll = (req, res) => {
    const orderId = req.query.orderId;
    const condition = orderId ? {orderId: {[Op.iLike]: `%${orderId}%`}} : null;

    Ordered.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving ordered."
            });
        });
};

// Find a single Ordered with an id
exports.findOne = (req, res) => {
    const orderedId = req.params.orderedId;

    Ordered.findByPk(orderedId)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Ordered with id=" + orderedId
            });
        });
};

// Update a Ordered by the id in the request
exports.update = (req, res) => {
    const orderedId = req.params.orderedId;

    Ordered.update(req.body, {
        where: { productId: orderedId }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Ordered was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Ordered with id=${orderedId}. Maybe Product was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Ordered with id=" + orderedId
            });
        });
};

// Delete a Ordered with the specified id in the request
exports.delete = (req, res) => {
    const orderedId = req.params.orderedId;

    Ordered.destroy({
        where: { orderedId: orderedId }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message:   "Ordered was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Ordered with id=${orderedId}. Maybe Ordered was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Ordered with id=" + orderedId
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
