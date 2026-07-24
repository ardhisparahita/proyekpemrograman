const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Inventory = sequelize.define(
  "inventories",
  {
    warehouse_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },

    product_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },

    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Inventory;