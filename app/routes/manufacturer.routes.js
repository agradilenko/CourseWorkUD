module.exports = app => {
    const manufacturers = require("../controllers/manufacturer.controller.js");
    const router = require("express").Router();

    // Display add Manufacturer form
    router.get('/add', (req, res) => res.render('addManufacturer'));

    //Display delete Manufacturer form
    router.get('/delete', (req, res) => res.render('deleteManufacturer'));

    //Display find Manufacturer form
    router.get('/find', (req, res) => res.render('findManufacturer'));

    //Display update Manufacturer form
    router.get('/update', (req, res) => res.render('updateManufacturer'));

    // Create a new Manufacturer
    router.post("/add", manufacturers.create);

    // Retrieve all Manufacturers
    router.get('/', manufacturers.retrieveAll);

    // Search for Manufacturer
    router.get('/:manufacturerName', manufacturers.searchManufacturer);

    // Update a Manufacturer with id
    router.put("/:manufacturerId", manufacturers.update);

    // Delete a Manufacturer with id
    router.delete("/:manufacturerId", manufacturers.delete);

    // Delete all Manufacturers
    router.delete("/", manufacturers.deleteAll);

    app.use("/api/manufacturers", router);
};
