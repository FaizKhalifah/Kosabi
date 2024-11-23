// models/User.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('./index');

class User extends Model {}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'penyewa'), // Role untuk membedakan admin dan penyewa
      defaultValue: 'penyewa',
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
  }
);

module.exports = User;
