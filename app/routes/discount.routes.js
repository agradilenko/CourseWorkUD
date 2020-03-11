module.exports = app => {
    const discounts = require("../controllers/discount.controller.js");

    const router = require("express").Router();

    // Create a new Discount
    router.post("/", discounts.create);

    // Retrieve all Discounts
    router.get("/", discounts.findAll);

    // Retrieve a single Discount with id
    router.get("/:discountId", discounts.findOne);

    // Update a Discount with id
    router.put("/:discountId", discounts.update);

    // Delete a Discount with id
    router.delete("/:discountId", discounts.delete);

    // Delete all Discounts
    router.delete("/", discounts.deleteAll);

    app.use("/api/discounts", router);
};
