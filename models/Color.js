const {DataTypes, Model} = require('sequelize');
const database = require('../database/database');

class Color extends Model{}

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
    color: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pantone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
};

const modelAttributes = Object.assign({}, attributes);
modelAttributes['name']['isAlphanumeric'] = true;
modelAttributes['name']['notNull'] = true;
modelAttributes['name']['notEmpty'] = true;
modelAttributes['color']['notNull'] = true;
modelAttributes['color']['notEmpty'] = true;
modelAttributes['pantone']['notNull'] = true;
modelAttributes['pantone']['notEmpty'] = true;
modelAttributes['year']['isInt'] = true;
modelAttributes['year']['notNull'] = true;
modelAttributes['year']['not'] = ['0'];

Color.init(modelAttributes, {
    sequelize: database,
    modelName: 'color',
    tableName: 'color',
    paranoid: true,
    timestamps: true,
    deletedAt: 'deleted_at',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

module.exports.attributes = attributes;
module.exports.model = Color;