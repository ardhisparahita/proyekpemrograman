const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const DeliveryOrderItem = sequelize.define(
  "delivery_order_items",
  {
    delivery_order_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },

    product_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },

    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = DeliveryOrderItem;