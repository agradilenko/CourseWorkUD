module.exports = app => {
    const types = require("../controllers/client.controller.js");

    const router = require("express").Router();

    // Create a new Client
    router.post("/", types.create);

    // Retrieve all Clients
    router.get("/", types.findAll);

    // Retrieve a single Client with id
    router.get("/:clientId", types.findOne);

    // Update a Client with id
    router.put("/:clientId", types.update);

    // Delete a Client with id
    router.delete("/:clientId", types.delete);

    // Retrieve all Clients from the same city
    // router.get("/:city", types.findAllClientsFromOneCity);

    // Delete all Clients
    router.delete("/", types.deleteAll);

    app.use("/api/clients", router);
};
