const db = require("../models");
const Client = db.clients;
const Op = db.Sequelize.Op;

// Create and Save a new Client
exports.create = (req, res) => {
    // Validate request
    if (!req.body.clientId) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Client
    const client = {
        clientId: req.body.clientId,
        fullName: req.body.fullName,
        city: req.body.city,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
    };

    // Save Client in the database
    Client.create(client)
        .then(data => {
            res.redirect('/api/clients');
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Client."
            });
        });
};

// // Retrieve all Clients from the database.
// exports.findAll = (req, res) => {
//     const fullName = req.query.fullName;
//     const condition = fullName ? {fullName: {[Op.iLike]: `%${fullName}%`}} : null;
//
//     Client.findAll({ where: condition })
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while retrieving clients."
//             });
//         });
// };

// Find a single Client with an id
exports.findOne = (req, res) => {
    const clientId = req.params.clientId;

    Client.findByPk(clientId)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Client with id=" + clientId
            });
        });
};

// Update a Client by the id in the request
exports.update = (req, res) => {
    const id = req.params.clientId;

    Client.update(req.body, {
        where: { clientId: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Client was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Client with id=${id}. Maybe Client was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Client with id=" + id
            });
        });
};

// Delete a Client with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.clientId;

    Client.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message:   "Client was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Client with id=${id}. Maybe Client was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Client with clientId=" + id
            });
        });
};

// Delete all Clients from the database.
exports.deleteAll = (req, res) => {
    Client.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Clients were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all clients."
            });
        });
};

// exports.findAllClientsFromOneCity = (req, res) => {
//     const city = req.params.city;
//     Client.findAll({ where: { city: city } })
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while retrieving Clients."
//             });
//         });
// };
