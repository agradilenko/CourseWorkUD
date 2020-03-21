module.exports = app => {

    const discounts = require("../controllers/discount.controller.js");
    const router = require("express").Router();
    const Sequelize = require('sequelize');
    const db = require("../models");
    const Discount = db.discounts;
    const Op = db.Sequelize.Op;


    // Display add Discount form
    router.get('/add', (req, res) => res.render('addDiscount'));

    //Display delete Discount form
    router.get('/delete', (req, res) => res.render('deleteDiscount'));

    //Display find Discount form
    router.get('/find', (req, res) => res.render('findDiscount'));

    //Display update Discount form
    router.get('/update', (req, res) => res.render('updateDiscount'));

    // Retrieve all Discounts
    router.get('/', (req, res) =>
        Discount.findAll()
            .then(discounts => res.render('discounts', {
                discounts
            }))
            .catch(err => console.log(err)));

    // Create a new Discount
    router.post("/add", discounts.create);

    // Retrieve all Discounts
    router.get("/", discounts.findAll);

    // Search for Вшысщгтеы
    router.get('/:discountName', (req, res) => {
        let discountName = req.query.discountName;
        Discount.findAll({ where: { discountName: { [Op.like]: '%' + discountName + '%' } } })
            .then(discounts => res.render('discounts', { discounts }))
            .catch(err => console.log(err));
    });
    // Update a Discount with id
    router.put("/:discountId", discounts.update);

    // Delete a Discount with id
    router.delete("/:discountId", discounts.delete);

    // Delete all Discounts
    router.delete("/", discounts.deleteAll);

    app.use("/api/discounts", router);
};
