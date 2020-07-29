'use strict';

const attributes = require('../../models/Color').attributes;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    attributes['created_at'] = {
      type: Sequelize.DataTypes.DATE,
      allowNull: false,
    }
    attributes['updated_at'] = {
      type: Sequelize.DataTypes.DATE,
      allowNull: false,
    }
    attributes['deleted_at'] = {
      type: Sequelize.DataTypes.DATE,
      allowNull: true
    }

    try{
      await queryInterface.createTable('color', attributes);
      console.log("CREATE color TABLE MIGRATION APPLIED SUCCESSFULLY");
    }
    catch(error){
      console.error("CREATE color TABLE MIGRATION ERROR", error);
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
      await queryInterface.dropTable('color');
      console.log("DROP color TABLE APPLIED SUCCESSFULLY");
    }
    catch(error){
      console.error("DROP color TABLE ERROR", error);

    }
  }
};
