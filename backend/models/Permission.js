const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Permission = sequelize.define('Permission', {
    id_permission: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name_permission: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'permission',
    schema: 'oferte-ganhe',
    timestamps: false,
});

module.exports = Permission;
