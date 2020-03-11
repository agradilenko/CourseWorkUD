module.exports = app => {
    const orders = require("../controllers/order.controller.js");

    const router = require("express").Router();

    // Create a new Order
    router.post("/", orders.create);

    // Retrieve all Orders
    router.get("/", orders.findAll);

    // Retrieve a single Order with id
    router.get("/:orderId", orders.findOne);

    // Update a Order with id
    router.put("/:orderId", orders.update);

    // Delete a Order with id
    router.delete("/:orderId", orders.delete);

    // Delete all Orders
    router.delete("/", orders.deleteAll);

    app.use("/api/orders", router);
};
