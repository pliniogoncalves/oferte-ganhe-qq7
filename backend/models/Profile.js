const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Profile = sequelize.define('Profile', {
  id_profile: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name_profile: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'profile',
  schema: 'oferte-ganhe',
  timestamps: false,
});

module.exports = Profile;
