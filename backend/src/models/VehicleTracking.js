const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const VehicleTracking = sequelize.define(
  "vehicle_trackings",
  {
    driver_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },

    delivery_order_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },

    latitude: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: false,
    },

    longitude: {
      type: DataTypes.DECIMAL(11, 8),
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM(
        "STARTED",
        "ON_DELIVERY",
        "ARRIVED",
        "FINISHED"
      ),
      defaultValue: "STARTED",
    },

    tracking_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = VehicleTracking;