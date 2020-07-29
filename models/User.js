import {DataTypes, Model} from "sequelize";
const database = require('../database/database');

class User extends Model {}
User.init({
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
}, {
    sequelize: database,
    modelName: 'User',
    tableName: 'user',
});