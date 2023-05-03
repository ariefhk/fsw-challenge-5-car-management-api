"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Histories", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      createdBy: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      updatedBy: {
        allowNull: true,
        type: Sequelize.UUID,
      },
      deletedBy: {
        allowNull: true,
        type: Sequelize.UUID,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Histories");
  },
};
