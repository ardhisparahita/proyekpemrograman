const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Validation = sequelize.define(
  "validations",
  {
    delivery_order_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },

    validated_by: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },

    validation_status: {
      type: DataTypes.ENUM("VALID", "INVALID"),
      allowNull: false,
      defaultValue: "VALID",
    },

    validation_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Validation;