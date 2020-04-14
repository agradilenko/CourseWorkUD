module.exports = app => {

    const discounts = require("../controllers/discount.controller.js");
    const router = require("express").Router();

    // Display add Discount form
    router.get('/add', (req, res) => res.render('addDiscount'));

    //Display delete Discount form
    router.get('/delete', (req, res) => res.render('deleteDiscount'));

    //Display find Discount form
    router.get('/find', (req, res) => res.render('findDiscount'));

    //Display update Discount form
    router.get('/update', (req, res) => res.render('updateDiscount'));

    // Retrieve all Discounts
    router.get('/', discounts.retrieveAll);

    // Search for Discounts
    router.get('/:discountName', discounts.searchDiscount);

    // Create a new Discount
    router.post("/add", discounts.create);

    // Update a Discount with id
    router.put("/:discountId", discounts.update);

    // Delete a Discount with id
    router.delete("/:discountId", discounts.delete);

    // Delete all Discounts
    router.delete("/", discounts.deleteAll);

    app.use("/api/discounts", router);
};
