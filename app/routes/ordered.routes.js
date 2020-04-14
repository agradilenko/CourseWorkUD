module.exports = app => {
    const ordered = require("../controllers/ordered.controller.js");
    const router = require("express").Router();

    // Display add Ordered form
    router.get('/add', (req, res) => res.render('addOrdered'));

    //Display delete Ordered form
    router.get('/delete', (req, res) => res.render('deleteOrdered'));

    //Display find Ordered form
    router.get('/find', (req, res) => res.render('findOrdered'));

    //Display update Ordered form
    router.get('/update', (req, res) => res.render('updateOrdered'));

    // Create a new Ordered
    router.post("/add", ordered.create);

    // Retrieve all Ordered
    router.get('/', ordered.retrieveAll);

    // Search for Ordered
    router.get('/:orderId', ordered.searchOrdered);

    // Update a Ordered with id
    router.put("/:orderId", ordered.update);

    // Delete a Ordered with id
    router.delete("/:orderId", ordered.delete);

    // Delete all Ordered
    router.delete("/", ordered.deleteAll);

    app.use("/api/ordered", router);
};
