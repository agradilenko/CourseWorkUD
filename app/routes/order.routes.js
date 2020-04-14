module.exports = app => {
    const orders = require("../controllers/order.controller.js");
    const router = require("express").Router();

    // Display add Order form
    router.get('/add', (req, res) => res.render('addOrder'));

    //Display delete Order form
    router.get('/delete', (req, res) => res.render('deleteOrder'));

    //Display find Order form
    router.get('/find', (req, res) => res.render('findOrder'));

    //Display update Order form
    router.get('/update', (req, res) => res.render('updateOrder'));

    // Create a new Order
    router.post("/add", orders.create);

    // Retrieve all Orders
    router.get('/', orders.retrieveAll);

    // Search for Orders
    router.get('/:category', orders.searchOrder);

    // Update a Order with id
    router.put("/:orderId", orders.update);

    // Delete a Order with id
    router.delete("/:orderId", orders.delete);

    // Delete all Orders
    router.delete("/", orders.deleteAll);

    app.use("/api/orders", router);
};
