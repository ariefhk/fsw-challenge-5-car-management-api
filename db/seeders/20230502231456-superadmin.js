"use strict";
const bcrypt = require("bcrypt");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      "Users",
      [
        {
          id: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
          name: "superadmin",
          email: "superadmin@gmail.com",
          encryptedPassword: bcrypt.hashSync("superadmin123", 10),
          role: "Super Admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "77cc3c5d-3ada-4993-a6a2-7f95c6529748",
          name: "admin",
          email: "admin@gmail.com",
          encryptedPassword: bcrypt.hashSync("admin123", 10),
          role: "Admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "6782d14b-f900-495d-979c-e8a45ba7fda1",
          name: "member",
          email: "member@gmail.com",
          encryptedPassword: bcrypt.hashSync("member123", 10),
          role: "Member",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
