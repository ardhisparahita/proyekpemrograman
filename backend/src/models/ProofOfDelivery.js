const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ProofOfDelivery = sequelize.define(
  "proof_of_deliveries",
  {
    delivery_order_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },

    photo_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    signature_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    received_by: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    uploaded_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = ProofOfDelivery;