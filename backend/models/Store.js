const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Store = sequelize.define('Store', {
    id_store: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name_store: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    number_store: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    tableName: 'store',
    schema: 'oferte-ganhe',
    timestamps: false,
});

module.exports = Store;
