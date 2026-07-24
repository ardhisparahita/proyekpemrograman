const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Product = sequelize.define(
  "products",
  {
    product_code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    barcode: {
      type: DataTypes.STRING,
      unique: true,
    },

    unit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Product;