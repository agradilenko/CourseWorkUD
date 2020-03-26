module.exports = app => {
    const orders = require("../controllers/order.controller.js");
    const router = require("express").Router();
    const Sequelize = require('sequelize');
    const db = require("../models");
    const Order = db.orders;
    const Op = db.Sequelize.Op;

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
    router.get('/', (req, res) =>
        Order.findAll()
            .then(orders => res.render('orders', {
                orders
            }))
            .catch(err => console.log(err)));

    // Search for orders
    router.get('/:clientId', (req, res) => {
        let clientId = req.query.clientId;
        Order.findAll({ where: { clientId: { [Op.like]: '%' + clientId + '%' } } })
            .then(orders => res.render('orders', { orders }))
            .catch(err => console.log(err));
    });

    // Update a Order with id
    router.put("/:orderId", orders.update);

    // Delete a Order with id
    router.delete("/:orderId", orders.delete);

    // Delete all Orders
    router.delete("/", orders.deleteAll);

    app.use("/api/orders", router);
};
