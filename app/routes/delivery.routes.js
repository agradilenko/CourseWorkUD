module.exports = app => {
    const delivery = require("../controllers/delivery.controller.js");
    const router = require("express").Router();
    const Sequelize = require('sequelize');
    const db = require("../models");
    const Delivery = db.delivery;
    const Op = db.Sequelize.Op;

    // Display add Delivery form
    router.get('/add', (req, res) => res.render('addDelivery'));

    //Display delete Delivery form
    router.get('/delete', (req, res) => res.render('deleteDelivery'));

    //Display find Delivery form
    router.get('/find', (req, res) => res.render('findDelivery'));

    //Display update Delivery form
    router.get('/update', (req, res) => res.render('updateDelivery'));

    // Create a new Delivery
    router.post("/", delivery.create);

    // Retrieve all Delivery
    router.get('/', (req, res) =>
        Delivery.findAll()
            .then(delivery => res.render('delivery', {
                delivery
            }))
            .catch(err => console.log(err)));

    // Search for Discounts
    router.get('/:deliveryName', (req, res) => {
        let deliveryName = req.query.deliveryName;
        Delivery.findAll({ where: { deliveryName: { [Op.like]: '%' + deliveryName + '%' } } })
            .then(delivery => res.render('delivery', { delivery }))
            .catch(err => console.log(err));
    });

    // Update a Delivery with id
    router.put("/:deliveryId", delivery.update);

    // Delete a Delivery with id
    router.delete("/:deliveryId", delivery.delete);

    // Delete all Deliverys
    router.delete("/", delivery.deleteAll);

    app.use("/api/delivery", router);
};
