const {DataTypes, Model} = require('sequelize');
const User = require('./User').model;
const database = require('../database/database')

class Role extends Model {}

const attributes = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    alias: {
        type: DataTypes.STRING,
        allowNull: false,
    }
};

Role.init(attributes, {
    sequelize: database,
    modelName: 'Role',
    tableName: 'role',
});

Role.hasMany(User, {
    foreignKey: 'role_id',
});
User.belongsTo(Role);

module.exports.attributes = attributes;