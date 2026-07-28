"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.addColumn("delivery_orders", "created_at", {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    });

    await queryInterface.addColumn("delivery_orders", "updated_at", {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    });

  },

  async down(queryInterface) {

    await queryInterface.removeColumn("delivery_orders", "created_at");
    await queryInterface.removeColumn("delivery_orders", "updated_at");

  },
};