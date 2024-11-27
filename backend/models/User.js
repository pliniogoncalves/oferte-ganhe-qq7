const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Profile = require('./Profile');
const Store = require('./Store');

const User = sequelize.define('User', {
    id_users: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name_users: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    registration_users: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email_users: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password_users: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    id_profile: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        references: {
            model: 'Profile',
            key: 'id_profile',
        },
        onDelete: 'SET DEFAULT',
    },
    id_store: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        references: {
            model: 'Store',
            key: 'id_store',
        },
        onDelete: 'SET DEFAULT',
    },
}, {
    tableName: 'users',
    schema: 'oferte-ganhe',
    timestamps: false,
});

//Associations
User.belongsTo(Profile, { foreignKey: 'id_profile', as: 'profile' });
User.belongsTo(Store, { foreignKey: 'id_store', as: 'store' });

module.exports = User;
