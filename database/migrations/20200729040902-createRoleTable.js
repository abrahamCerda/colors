'use strict';

const attributes = require('../../models/Role').attributes;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    queryInterface.createTable('role', attributes)
        .then(() => {
      console.log('CREATE role TABLE MIGRATION APPLIED SUCCESSFULLY');
    }).catch(error => {
      console.error('CREATE role TABLE MIGRATION ERROR', error);
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     *
     * USE OF ASYNC AND AWAIT IN ORDER TO DEMONSTRATE THE EXPERIENCE WITH ES8 ASYNC FUNCTIONS.
     */
    try{
      await queryInterface.dropTable('user');
      console.log("DROP role TABLE APPLIED SUCCESSFULLY");
    }
    catch(error){
      console.error("DROP role TABLE ERROR", error);
    }
  }
};
