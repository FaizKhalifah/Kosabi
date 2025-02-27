'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Rent.belongsTo(models.User, { foreignKey: 'userId', as: 'renter' });
      Rent.belongsTo(models.Room, { foreignKey: 'roomId', as: 'room' });
    }
  }
  Rent.init({
    userId: DataTypes.UUID,
    roomId: DataTypes.UUID,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    status: DataTypes.ENUM
  }, {
    sequelize,
    modelName: 'Rent',
  });
  return Rent;
};