'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Penyewa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Penyewa.init({
    NIK: DataTypes.STRING,
    domisili: DataTypes.STRING,
    email: DataTypes.STRING,
    nohp: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Penyewa',
  });
  return Penyewa;
};