module.exports = app => {
    const types = require("../controllers/type.controller.js");
    const router = require("express").Router();

    // Display add Type form
    router.get('/add', (req, res) => res.render('addType'));

    //Display delete Type form
    router.get('/delete', (req, res) => res.render('deleteType'));

    //Display find Type form
    router.get('/find', (req, res) => res.render('findType'));

    //Display update Type form
    router.get('/update', (req, res) => res.render('updateType'));

    // Create a new Type
    router.post("/add", types.create);

    // Retrieve all Types
    router.get('/', types.retrieveAll);

    // Search for Types
    router.get('/:category', types.searchType);

    // Update a Type with id
    router.put("/:typeId", types.update);

    // Delete a Type with id
    router.delete("/:typeId", types.delete);

    // Delete all Types
    router.delete("/", types.deleteAll);

    app.use("/api/types", router);
};
