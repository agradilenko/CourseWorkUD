module.exports = app => {
    const delivery = require("../controllers/delivery.controller.js");

    const router = require("express").Router();

    // Create a new Delivery
    router.post("/", delivery.create);

    // Retrieve all Deliverys
    router.get("/", delivery.findAll);

    // Retrieve a single Delivery with id
    router.get("/:deliveryId", delivery.findOne);

    // Update a Delivery with id
    router.put("/:deliveryId", delivery.update);

    // Delete a Delivery with id
    router.delete("/:deliveryId", delivery.delete);

    // Delete all Deliverys
    router.delete("/", delivery.deleteAll);

    app.use("/api/delivery", router);
};
