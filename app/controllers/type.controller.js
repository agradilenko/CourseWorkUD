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
            res.redirect('/api/types');
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while creating the Type."
            })
        })
};

// Retrieve all Types
exports.retrieveAll = (req, res) => {
    Type.findAll()
        .then(types => res.render('types', {
            types
        }))
        .catch(err => console.log(err));
};

//Search by the category in the request
exports.searchType = (req, res) => {
    let category = req.query.category;
    Client.findAll({ where: { category: { [Op.like]: '%' + category + '%' } } })
        .then(types => res.render('types', { types }))
        .catch(err => console.log(err));
};

// Update a Type by the id in the request
exports.update = (req, res) => {
    const typeId = req.params.typeId;
    console.log(typeId);
    console.log(req.body);
    Type.update(req.body, {
        where: { typeId: typeId }
    })
        .then(types => {
            if (types == 1) {
                res.render('types', {types});
            } else {
                res.send({
                    message: `Cannot update Type with id=${typeId}. Maybe Type was not found or req.body is empty!`
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
            if (num === 1) {
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
