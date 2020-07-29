const {DataTypes, Model} = require("sequelize");
const database = require('../database/database');

class User extends Model {}

const attributes = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
};

User.init(attributes, {
    sequelize: database,
    modelName: 'User',
    tableName: 'user',
});
module.exports.model = User;
module.exports.attributes = attributes;