module.exports = app => {
    const clients = require("../controllers/client.controller.js");
    const router = require("express").Router();
    const Sequelize = require('sequelize');
    const db = require("../models");
    const Client = db.clients;
    const Op = db.Sequelize.Op;

    // Display add Client form
    router.get('/add', (req, res) => res.render('addClient'));

    //Display delete Client form
    router.get('/delete', (req, res) => res.render('deleteClient'));

    //Display find Client form
    router.get('/find', (req, res) => res.render('findClient'));

    //Display update Client form
    router.get('/update', (req, res) => res.render('updateClient'));

    // Create a new Client
    router.post("/", clients.create);

    // Retrieve all Clients
    router.get('/', (req, res) =>
        Client.findAll()
            .then(clients => res.render('clients', {
                clients
            }))
            .catch(err => console.log(err)));

    // Retrieve a single Client with id
    router.get("/:clientId", clients.findOne);

    // Update a Client with id
    router.put("/:clientId", clients.update);

    // Delete a Client with id
    router.delete("/:clientId", clients.delete);

    // Retrieve all Clients from the same city
    // router.get("/:city", types.findAllClientsFromOneCity);

    // Delete all Clients
    router.delete("/", clients.deleteAll);

    app.use("/api/clients", router);
};
