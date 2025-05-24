'use strict';
const {
  Model
} = require('sequelize');
const Rental = require('./rental');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Room.hasOne(Rental,{ foreignKey: 'tenantId' });
    }
  }
  Room.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    number: DataTypes.INTEGER,
    type: DataTypes.STRING,
    price: DataTypes.INTEGER,
    ownerId: {
      type:DataTypes.UUID,
        allowNull:true,
        references:{
        model:'Tenant',
        key:'id'
      }
    },
    photo: {
      type: DataTypes.STRING, // untuk path foto
      allowNull: true,
    }
  },
   
  {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};