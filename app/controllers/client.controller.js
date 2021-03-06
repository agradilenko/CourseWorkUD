const db = require("../models");
const Client = db.clients;
const Op = db.Sequelize.Op;

// Create and Save a new Client
exports.create = (req, res) => {
    // Validate request
    if (!req.body.fullName) {
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

// Retrieve all Clients
exports.retrieveAll = (req, res) => {
    Client.findAll()
        .then(clients => res.render('clients', {
            clients
        }))
        .catch(err => console.log(err));
};

//Search by the fullName in the request
exports.searchClient = (req, res) => {
    let fullName = req.query.fullName;
    Client.findAll({ where: { fullName: { [Op.like]: '%' + fullName + '%' } } })
        .then(clients => res.render('clients', { clients }))
        .catch(err => console.log(err));
};

// Update a Client by the id in the request
exports.update = (req, res) => {
    const clientId = req.params.clientId;

    Client.update(req.body, {
        where: { clientId: clientId }
    })
        .then(clients => {
            if (clients === 1) {
                res.render('clients', {clients})
            } else {
                res.send({
                    message: `Cannot update Product with id=${clientId}. Maybe Product was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Product with id=" + clientId
            });
        });
};
// Delete a Client with the specified id in the request
exports.delete = (req, res) => {
    const clientId = req.params.clientId;

    Client.destroy({
        where: { clientId: clientId }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message:   "Client was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Client with id=${clientId}. Maybe Client was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Client with clientId=" + clientId
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
