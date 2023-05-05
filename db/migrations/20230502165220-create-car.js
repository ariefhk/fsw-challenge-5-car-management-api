"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Cars", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      name: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      size: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
      },
      available: {
        type: Sequelize.BOOLEAN,
      },
      createdBy: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: {
            tableName: "Users",
          },
          key: "id",
        },
      },
      updatedBy: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: {
            tableName: "Users",
          },
          key: "id",
        },
      },
      deletedBy: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: {
            tableName: "Users",
          },
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Cars");
  },
};
