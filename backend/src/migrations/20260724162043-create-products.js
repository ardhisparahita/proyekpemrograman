"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("products", {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      product_code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      product_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      barcode: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },

      unit: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("products");
  },
};