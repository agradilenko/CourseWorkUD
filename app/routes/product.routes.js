

module.exports = app => {
  const products = require("../controllers/product.controller.js");
  const router = require("express").Router();
  const Sequelize = require('sequelize');
  const db = require("../models");
  const Product = db.products;
  const Op = db.Sequelize.Op;

  // Create a new Product
  router.post("/add", products.create);

  // Retrieve all Products
  router.get('/', (req, res) =>
      Product.findAll()
          .then(products => res.render('products', {
            products
          }))
          .catch(err => console.log(err)));

  // Display add Product form
  router.get('/add', (req, res) => res.render('addProduct'));

  //Display delete Product form
  router.get('/delete', (req, res) => res.render('deleteProduct'));

  //Display delete Product form
  router.get('/find', (req, res) => res.render('findProduct'));

  // Retrieve all available Products
  router.get("/availability", products.findAllAvailable);

  // Retrieve a single Product with id
  // router.get("/:productId", products.findOne);

  // Search for
  router.get('/search?productId', (req, res) => {
    let  productId  = req.query.productId;
    Product.findAll({ where: { productId: { [Op.like]: '%' + productId + '%' } } })
        .then(products => res.render('products', { products }))
        .catch(err => console.log(err));
  });

  // Update a Product with id
  router.put("/:productId", products.update);

  // Delete a Product with id
  router.delete("/:productId", products.delete);

  // Delete all Products
  router.delete("/", products.deleteAll);

  app.use("/api/products", router);
};
