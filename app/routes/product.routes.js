
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

  //Display find Product form
  router.get('/find', (req, res) => res.render('findProduct'));

  //Display update Product form
  router.get('/update', (req, res) => res.render('updateProduct'));

  // Search for products
  router.get('/:productName', (req, res) => {
    let productName = req.query.productName;
    Product.findAll({ where: { productName: { [Op.like]: '%' + productName + '%' } } })
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
