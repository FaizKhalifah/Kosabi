'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tenant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tenant.init({
    fullName: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    nik: DataTypes.STRING,
    domisili: DataTypes.STRING,
    roomId: {
        type:DataTypes.UUID,
        allowNull:true,
        references:{
        model:'Room',
        key:'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Tenant',
  });
  return Tenant;
};