const db = require("../models");
const Type = db.types;
const Op = db.Sequelize.Op;

// Create and Save new Type
exports.create = (req, res) => {
    // Validate request
    if (!req.body.typeId) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Create new Type
    const type = {
        typeId: req.body.typeId,
        category: req.body.category
    };
    // Save Type in the database
    Type.create(type)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while creating the Type."
            })
        })
};

// Retrieve all Types from the database.
exports.findAll = (req, res) => {
    const category = req.query.category;
    const condition = category ? {category: {[Op.iLike]: `%${category}%`}} : null;

    Type.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving types."
            });
        });
};

// Find a single Type with an id
exports.findOne = (req, res) => {
    const typeId = req.params.typeId;

    Type.findByPk(typeId)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Type with id=" + typeId
            });
        });
};

// Update a Type by the id in the request
exports.update = (req, res) => {
    const typeId = req.params.typeId;

    Type.update(req.body, {
        where: { productId: typeId }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Type was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Type with id=${typeId}. Maybe Product was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Type with id=" + typeId
            });
        });
};

// Delete a Type with the specified id in the request
exports.delete = (req, res) => {
    const typeId = req.params.typeId;

    Type.destroy({
        where: { typeId: typeId }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message:   "Type was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Type with id=${typeId}. Maybe Type was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Type with id=" + typeId
            });
        });
};

// Delete all Types from the database.
exports.deleteAll = (req, res) => {
    Type.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Types were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all types."
            });
        });
};
