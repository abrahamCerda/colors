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
    modelName: 'role',
    tableName: 'role',
    paranoid: true,
    timestamps: true,
    deletedAt: 'deleted_at',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

Role.hasMany(User, {
    foreignKey: 'role_id',
    sourceKey: 'id',
});
User.belongsTo(Role, {
    foreignKey: 'role_id',
    sourceKey: 'id',
});

module.exports.attributes = attributes;
module.exports.model = Role;