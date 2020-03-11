const db = require("../models");
const Manufacturer = db.manufacturer;
const Op = db.Sequelize.Op;

// Create and Save new Manufacturer
exports.create = (req, res) => {
    // Validate request
    if (!req.body.manufacturerId) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Create new Manufacturer
    const manufacturer = {
        manufacturerId: req.body.manufacturerId,
        manufacturerName: req.body.manufacturerName,
        manufacturerCountry: req.body.manufacturerCountry,
        headquarters: req.body.headquarters
    };
    // Save Manufacturer in the database
    Manufacturer.create(manufacturer)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Manufacturer."
            })
        })
};

// Retrieve all Manufacturers from the database.
exports.findAll = (req, res) => {
    const manufacturerName = req.query.manufacturerName;
    const condition = manufacturerName ? {manufacturerName: {[Op.iLike]: `%${manufacturerName}%`}} : null;

    Manufacturer.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving manufacturers."
            });
        });
};

// Find a single Manufacturer with an id
exports.findOne = (req, res) => {
    const manufacturerId = req.params.manufacturerId;

    Manufacturer.findByPk(manufacturerId)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Manufacturer with id=" + manufacturerId
            });
        });
};

// Update a Manufacturer by the id in the request
exports.update = (req, res) => {
    const manufacturerId = req.params.manufacturerId;

    Manufacturer.update(req.body, {
        where: { productId: manufacturerId }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Manufacturer was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Manufacturer with id=${manufacturerId}. Maybe Product was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Manufacturer with id=" + manufacturerId
            });
        });
};

// Delete a Manufacturer with the specified id in the request
exports.delete = (req, res) => {
    const manufacturerId = req.params.manufacturerId;

    Manufacturer.destroy({
        where: { manufacturerId: manufacturerId }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message:   "Manufacturer was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Manufacturer with id=${manufacturerId}. Maybe Manufacturer was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Manufacturer with id=" + manufacturerId
            });
        });
};

// Delete all Manufacturers from the database.
exports.deleteAll = (req, res) => {
    Manufacturer.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Manufacturers were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all manufacturers."
            });
        });
};
