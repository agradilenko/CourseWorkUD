const db = require("../models");
const Product = db.products;
const Op = db.Sequelize.Op;

// Create and Save a new Product
exports.create = (req, res) => {
  // Validate request
  if (!req.body.productId) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Product
  const product = {
    productId: req.body.productId,
    productName: req.body.productName,
    typeId: req.body.typeId,
    manufacturerId: req.body.manufacturerId,
    availability: req.body.availability ? req.body.availability : false,
    purchaseCost: req.body.purchaseCost,
    saleCost: req.body.saleCost,
    quantityOnStock: req.body.quantityOnStock,
  };

  // Save Product in the database
  Product.create(product)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
              err.message || "Some error occurred while creating the Product."
        });
      });
};

// Retrieve all Products from the database.
exports.findAll = (req, res) => {
  const productName = req.query.productName;
  var condition = productName ? { productName: { [Op.iLike]: `%${productName}%` } } : null;

  Product.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
              err.message || "Some error occurred while retrieving products."
        });
      });
};

// Find a single Product with an id
exports.findOne = (req, res) => {
  const id = req.params.productId;

  Product.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Product with id=" + id
        });
      });
};

// Update a Product by the id in the request
exports.update = (req, res) => {
  const id = req.params.productId;

  Product.update(req.body, {
    where: { productId: id }
  })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Product was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Product with id=${id}. Maybe Product was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Product with id=" + id
        });
      });
};

// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.productId;

  Product.destroy({
    where: { id: id }
  })
      .then(num => {
        if (num == 1) {
          res.send({
            message:   "Product was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Product with productId=" + id
        });
      });
};

// Delete all Products from the database.
exports.deleteAll = (req, res) => {
  Product.destroy({
    where: {},
    truncate: false
  })
      .then(nums => {
        res.send({ message: `${nums} Products were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
              err.message || "Some error occurred while removing all products."
        });
      });
};

// find all available Product
exports.findAllAvailable = (req, res) => {
  Product.findAll({ where: { availability: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
              err.message || "Some error occurred while retrieving products."
        });
      });
};
