module.exports = app => {
    const types = require("../controllers/type.controller.js");

    const router = require("express").Router();

    // Create a new Type
    router.post("/", types.create);

    // Retrieve all Types
    router.get("/", types.findAll);

    // Retrieve a single Type with id
    router.get("/:typeId", types.findOne);

    // Update a Type with id
    router.put("/:typeId", types.update);

    // Delete a Type with id
    router.delete("/:typeId", types.delete);

    // Delete all Types
    router.delete("/", types.deleteAll);

    app.use("/api/types", router);
};
