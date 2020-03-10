module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("Products", {
        productId: {
          type: Sequelize.BIGINT,
          primaryKey: true,
          autoIncrement:true
        },
        productName: {
          type: Sequelize.STRING(100),
          allowNull: false,
          unique:true
        },
        typeId: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        manufacturerId: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        availability: {
          type: Sequelize.BOOLEAN,
          allowNull: false
        },
        purchaseCost: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        saleCost: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        quantityOnStock: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
      }, {
        timestamps:false
      }
  );

  return Product;
};
