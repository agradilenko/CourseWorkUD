module.exports = app => {
    const manufacturers = require("../controllers/manufacturer.controller.js");

    const router = require("express").Router();

    // Create a new Manufacturer
    router.post("/", manufacturers.create);

    // Retrieve all Manufacturers
    router.get("/", manufacturers.findAll);

    // Retrieve a single Manufacturer with id
    router.get("/:manufacturerId", manufacturers.findOne);

    // Update a Manufacturer with id
    router.put("/:manufacturerId", manufacturers.update);

    // Delete a Manufacturer with id
    router.delete("/:manufacturerId", manufacturers.delete);

    // Delete all Manufacturers
    router.delete("/", manufacturers.deleteAll);

    app.use("/api/manufacturers", router);
};
