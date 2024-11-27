const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Store = require('./Store');
const User = require('./User');

const Talon = sequelize.define('Talon', {
    id_talon: {
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
    date_send: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    user_send: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id_users',
        },
    },
    date_received: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    user_received: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: User,
            key: 'id_users',
        },
    },
    quantity_talon: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status_talon: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'talon',
    schema: 'oferte-ganhe',
    timestamps: false,
});

//Associations
Store.hasMany(Talon, { foreignKey: 'id_store' });
User.hasMany(Talon, { foreignKey: 'user_send', as: 'Sender' });
User.hasMany(Talon, { foreignKey: 'user_received', as: 'Receiver' });

Talon.belongsTo(Store, { foreignKey: 'id_store' });
Talon.belongsTo(User, { foreignKey: 'user_send', as: 'Sender' });
Talon.belongsTo(User, { foreignKey: 'user_received', as: 'Receiver' });

module.exports = Talon;
