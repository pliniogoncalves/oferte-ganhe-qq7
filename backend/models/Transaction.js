const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Talon = require('./Talon');
const User = require('./User');

const Transaction = sequelize.define('Transaction', {
    id_transaction: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_talon: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Talon,
            key: 'id_talon',
        },
    },
    type_transaction: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date_transaction: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    user_transaction: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id_users',
        },
    },
    quantity_talon_transaction: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'transaction',
    schema: 'oferte-ganhe',
    timestamps: false,
});


//Associations
Talon.hasMany(Transaction, { foreignKey: 'id_talon' });
User.hasMany(Transaction, { foreignKey: 'user_transaction' });

Transaction.belongsTo(Talon, { foreignKey: 'id_talon' });
Transaction.belongsTo(User, { foreignKey: 'user_transaction' });

module.exports = Transaction;
