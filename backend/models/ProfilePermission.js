const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Profile = require('./Profile');
const Permission = require('./Permission');

const ProfilePermission = sequelize.define('ProfilePermission', {
    id_profile_permission: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_profile: {
        type: DataTypes.INTEGER,
        references: {
            model: Profile,
            key: 'id_profile',
        },
    },
    id_permission: {
        type: DataTypes.INTEGER,
        references: {
            model: Permission,
            key: 'id_permission',
        },
    },
}, {
    tableName: 'profile_permission',
    schema: 'oferte-ganhe',
    timestamps: false,
});

// Association between Profile and Permission
Profile.belongsToMany(Permission, {
    through: ProfilePermission,
    foreignKey: 'id_profile',
    otherKey: 'id_permission',
});

Permission.belongsToMany(Profile, {
    through: ProfilePermission,
    foreignKey: 'id_permission',
    otherKey: 'id_profile',
});

module.exports = ProfilePermission;
