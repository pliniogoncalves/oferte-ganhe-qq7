const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Store = require('./Store');
const Talon = require('./Talon');

const Stock = sequelize.define('Stock', {
    id_stock: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_store: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        references: {
            model: Store,
            key: 'id_store',
        },
        onDelete: 'SET DEFAULT',
    },
    id_talon: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Talon,
            key: 'id_talon',
        },
        onDelete: 'SET NULL',
    },
    current_stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    minimum_stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    recommended_stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status_stock: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'stock',
    schema: 'oferte-ganhe',
    timestamps: false,
});

//Associations
Store.hasMany(Stock, { foreignKey: 'id_store' });
Talon.hasMany(Stock, { foreignKey: 'id_talon' });

Stock.belongsTo(Store, { foreignKey: 'id_store' });
Stock.belongsTo(Talon, { foreignKey: 'id_talon' });

module.exports = Stock;
