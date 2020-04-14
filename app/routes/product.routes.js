
module.exports = app => {
  const products = require("../controllers/product.controller.js");
  const router = require("express").Router();

  // Create a new Product
  router.post("/add", products.create);

  // Retrieve all Clients
  router.get('/', products.retrieveAll);

  // Display add Product form
  router.get('/add', (req, res) => res.render('addProduct'));

  //Display delete Product form
  router.get('/delete', (req, res) => res.render('deleteProduct'));

  //Display find Product form
  router.get('/find', (req, res) => res.render('findProduct'));

  //Display update Product form
  router.get('/update', (req, res) => res.render('updateProduct'));

  // Search for products
  router.get('/:productName', products.searchProduct);

  // Update a Product with id
  router.put("/:productId", products.update);

  // Delete a Product with id
  router.delete("/:productId", products.delete);

  // Delete all Products
  router.delete("/", products.deleteAll);

  app.use("/api/products", router);
};
