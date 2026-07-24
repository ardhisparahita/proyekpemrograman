"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("vehicle_trackings", {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      driver_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },

      delivery_order_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: "delivery_orders",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      latitude: {
        type: Sequelize.DECIMAL(10, 8),
        allowNull: false,
      },

      longitude: {
        type: Sequelize.DECIMAL(11, 8),
        allowNull: false,
      },

      status: {
        type: Sequelize.ENUM(
          "STARTED",
          "ON_DELIVERY",
          "ARRIVED",
          "FINISHED"
        ),
        allowNull: false,
        defaultValue: "STARTED",
      },

      tracking_time: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("vehicle_trackings");
  },
};