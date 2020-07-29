'use strict';
const Role = require('../../models/Role').model;
const User = require('../../models/User').model;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const roles = await Role.findAll({
      attributes: ['id', 'name'],
    });
    const adminRole = roles.find(role => role.name === 'administrator');
    const userRole = roles.find(role => role.name === 'user');
    await User.bulkCreate([
      {
        email: 'admin@multiplica.com',
        password: '654321',
        role_id: adminRole.id,
      },
      {
        email: 'user@multiplica.com',
        password: '123456',
        role_id: userRole.id,
        created_at: Date.now(),
        updated_at: Date.now(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('user', null, {});
  }
};
