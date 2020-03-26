module.exports = app => {
    const ordered = require("../controllers/ordered.controller.js");
    const router = require("express").Router();
    const Sequelize = require('sequelize');
    const db = require("../models");
    const Ordered = db.ordered;
    const Op = db.Sequelize.Op;

    // Display add Ordered form
    router.get('/add', (req, res) => res.render('addOrdered'));

    //Display delete Ordered form
    router.get('/delete', (req, res) => res.render('deleteOrdered'));

    //Display find Ordered form
    router.get('/find', (req, res) => res.render('findOrdered'));

    //Display update Ordered form
    router.get('/update', (req, res) => res.render('updateOrdered'));

    // Create a new Ordered
    router.post("/add", ordered.create);

    // Retrieve all Ordered
    router.get('/', (req, res) =>
        Ordered.findAll()
            .then(ordered => res.render('ordered', {
                ordered
            }))
            .catch(err => console.log(err)));

    // Search for ordered
    router.get('/:orderId', (req, res) => {
        let orderId = req.query.orderId;
        Ordered.findAll({ where: { orderId: orderId  }})
            .then(ordered => res.render('ordered', { ordered }))
            .catch(err => console.log(err));
    });

    // Update a Ordered with id
    router.put("/:orderId", ordered.update);

    // Delete a Ordered with id
    router.delete("/:orderId", ordered.delete);

    // Delete all Ordered
    router.delete("/", ordered.deleteAll);

    app.use("/api/ordered", router);
};
