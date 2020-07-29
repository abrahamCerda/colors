'use strict';

const attributes = require('../../models/User').attributes;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    attributes['role_id'] = {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: {
          tableName: 'role',
          schema: 'public'
        },
        key: 'id',
      },
    };

    /* ES8 async/await*/
    try{
      await queryInterface.createTable('user', attributes);
      console.log("CREATE user TABLE MIGRATION APPLIED SUCCESSFULLY");
    }
    catch(error){
      console.error("CREATE user TABLE MIGRATION ERROR", error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    try{
      await queryInterface.dropTable('user');
      console.log("DROP user TABLE APPLIED SUCCESSFULLY");
    }
    catch(error){
      console.error("DROP user TABLE ERROR", error);
    }
  }
};
