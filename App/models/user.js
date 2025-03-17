'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Room, { foreignKey: 'ownerId', as: 'rooms' });
      User.hasMany(models.Rent, { foreignKey: 'userId', as: 'rents' });
    }
  }
  User.init({
    id: DataTypes.UUID,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    domicile: DataTypes.STRING,
    role: DataTypes.ENUM
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};