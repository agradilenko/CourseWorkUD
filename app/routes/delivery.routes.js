module.exports = app => {
    const delivery = require("../controllers/delivery.controller.js");
    const router = require("express").Router();

    // Display add Delivery form
    router.get('/add', (req, res) => res.render('addDelivery'));

    //Display delete Delivery form
    router.get('/delete', (req, res) => res.render('deleteDelivery'));

    //Display find Delivery form
    router.get('/find', (req, res) => res.render('findDelivery'));

    //Display update Delivery form
    router.get('/update', (req, res) => res.render('updateDelivery'));

    // Create a new Delivery
    router.post("/add", delivery.create);

    // Retrieve all Deliveries
    router.get('/', delivery.retrieveAll);

    // Search for Deliveries
    router.get('/:deliveryName', delivery.searchDelivery);

    // Update a Delivery with id
    router.put("/:deliveryId", delivery.update);

    // Delete a Delivery with id
    router.delete("/:deliveryId", delivery.delete);

    // Delete all Delivery
    router.delete("/", delivery.deleteAll);

    app.use("/api/delivery", router);
};
