const {DataTypes, Model} = require("sequelize");
const database = require('../database/database');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;
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
    modelName: 'user',
    tableName: 'user',
    paranoid: true,
    timestamps: true,
    deletedAt: 'deleted_at',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

const assignHashedPassword = async (user, options) => {
    if(user.password && !user.changed('password')){
        return;
    }
    try{
        user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
    }
    catch(error){
        console.error("ERROR WHILE TRYING TO HASH PASSWORD", error);
        user.password = null;
    }
}
User.beforeBulkCreate(async (instances, options) => {
    /* Maybe For each, depending of future system performance*/
    for(const instance of instances){
        await assignHashedPassword(instance, options);
    }
})
User.beforeCreate(assignHashedPassword);
User.beforeUpdate(assignHashedPassword);

module.exports.model = User;
module.exports.attributes = attributes;