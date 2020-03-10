module.exports = app => {
  const products = require("../controllers/product.controller.js");

  const router = require("express").Router();

  // Create a new Product
  router.post("/", products.create);

  // Retrieve all Products
  router.get("/", products.findAll);

  // Retrieve all available Products
  router.get("/availability", products.findAllAvailable);

  // Retrieve a single Product with id
  router.get("/:productId", products.findOne);

  // Update a Product with id
  router.put("/:productId", products.update);

  // Delete a Product with id
  router.delete("/:productId", products.delete);

  // Delete all Products
  router.delete("/", products.deleteAll);

  app.use("/api/products", router);
};
