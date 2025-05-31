'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rental extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Rental.belongsTo(models.Tenant, { foreignKey: 'tenantId'});
      Rental.belongsTo(models.Room, { foreignKey: 'roomId'});
    }
  }
  Rental.init({
    tenantId: {
      type:DataTypes.UUID,
        allowNull:false,
        references:{
        model:'Tenant',
        key:'id'
      }
    },
    roomId: {
      type:DataTypes.UUID,
        allowNull:false,
        references:{
        model:'Room',
        key:'id'
      }
    },
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    status: {type:DataTypes.STRING, allowNull:false, defaultValue:'reserved'}, 
    notes: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Rental',
  });
  return Rental;
};