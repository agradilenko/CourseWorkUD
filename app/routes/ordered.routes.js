module.exports = app => {
    const ordered = require("../controllers/ordered.controller.js");

    const router = require("express").Router();

    // Create a new Ordered
    router.post("/", ordered.create);

    // Retrieve all Ordereds
    router.get("/", ordered.findAll);

    // Retrieve a single Ordered with id
    router.get("/:orderId", ordered.findOne);

    // Update a Ordered with id
    router.put("/:orderId", ordered.update);

    // Delete a Ordered with id
    router.delete("/:orderId", ordered.delete);

    // Delete all Ordereds
    router.delete("/", ordered.deleteAll);

    app.use("/api/ordered", router);
};
