module.exports = app => {
    const manufacturers = require("../controllers/manufacturer.controller.js");
    const router = require("express").Router();
    const Sequelize = require('sequelize');
    const db = require("../models");
    const Manufacturer = db.manufacturer;
    const Op = db.Sequelize.Op;



    // Display add Manufacturer form
    router.get('/add', (req, res) => res.render('addManufacturer'));

    //Display delete Manufacturer form
    router.get('/delete', (req, res) => res.render('deleteManufacturer'));

    //Display find Manufacturer form
    router.get('/find', (req, res) => res.render('findManufacturer'));

    //Display update Manufacturer form
    router.get('/update', (req, res) => res.render('updateManufacturer'));

    // Create a new Manufacturer
    router.post("/", manufacturers.create);

    // Retrieve all Manufacturer
    router.get('/', (req, res) =>
        Manufacturer.findAll()
            .then(manufacturers => res.render('manufacturers', {
                manufacturers
            }))
            .catch(err => console.log(err)));

    // Search for Manufacturer
    router.get('/:manufacturerName', (req, res) => {
        let manufacturerName = req.query.manufacturerName;
        Manufacturer.findAll({ where: { manufacturerName: { [Op.like]: '%' + manufacturerName   + '%' } } })
            .then(products => res.render('products', { products }))
            .catch(err => console.log(err));
    });

    // Update a Manufacturer with id
    router.put("/:manufacturerId", manufacturers.update);

    // Delete a Manufacturer with id
    router.delete("/:manufacturerId", manufacturers.delete);

    // Delete all Manufacturers
    router.delete("/", manufacturers.deleteAll);

    app.use("/api/manufacturers", router);
};
