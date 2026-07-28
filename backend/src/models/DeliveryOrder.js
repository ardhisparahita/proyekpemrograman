const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const DeliveryOrder = sequelize.define(
  "delivery_orders",
  {
    do_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    admin_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },

    driver_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },

    destination: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    delivery_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

warehouse_id: {
  type: DataTypes.BIGINT,
  allowNull: false,
},

    status: {
      type: DataTypes.ENUM(
        "PENDING",
        "PICKING",
        "ON_DELIVERY",
        "COMPLETED",
        "CANCELLED"
      ),
      defaultValue: "PENDING",
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
},

);

module.exports = DeliveryOrder;