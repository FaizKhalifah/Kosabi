'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Room.belongsTo(models.User, { foreignKey: 'ownerId', as: 'owner' });
      Room.hasMany(models.Rent, { foreignKey: 'roomId', as: 'rentals' });
    }
  }
  Room.init({
    number: DataTypes.INTEGER,
    type: DataTypes.STRING,
    price: DataTypes.INTEGER,
    ownerId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};