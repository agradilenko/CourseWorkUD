const db = require("../models");
const Delivery = db.delivery;
const Op = db.Sequelize.Op;

// Create and Save new Delivery
exports.create = (req, res) => {
    // Validate request
    if (!req.body.deliveryId) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Create new Delivery
    const delivery = {
        deliveryId: req.body.deliveryId,
        deliveryName: req.body.deliveryName,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email
    };
    // Save Delivery in the database
    Delivery.create(delivery)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Delivery."
            })
        })
};

// Retrieve all Delivery from the database.
exports.findAll = (req, res) => {
    const deliveryName = req.query.deliveryName;
    const condition = deliveryName ? {deliveryName: {[Op.iLike]: `%${deliveryName}%`}} : null;

    Delivery.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving delivery."
            });
        });
};

// Find a single Delivery with an id
exports.findOne = (req, res) => {
    const deliveryId = req.params.deliveryId;

    Delivery.findByPk(deliveryId)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Delivery with id=" + deliveryId
            });
        });
};

// Update a Delivery by the id in the request
exports.update = (req, res) => {
    const deliveryId = req.params.deliveryId;

    Delivery.update(req.body, {
        where: { productId: deliveryId }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Delivery was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Delivery with id=${deliveryId}. Maybe Product was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Delivery with id=" + deliveryId
            });
        });
};

// Delete a Delivery with the specified id in the request
exports.delete = (req, res) => {
    const deliveryId = req.params.deliveryId;

    Delivery.destroy({
        where: { deliveryId: deliveryId }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message:   "Delivery was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Delivery with id=${deliveryId}. Maybe Delivery was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Delivery with id=" + deliveryId
            });
        });
};

// Delete all Delivery from the database.
exports.deleteAll = (req, res) => {
    Delivery.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Delivery were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all delivery."
            });
        });
};
