// models/Kamar.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('./index');

class Kamar extends Model {}

Kamar.init(
  {
    nomor_kamar: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    harga: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('tersedia', 'terisi'),
      defaultValue: 'tersedia',
    },
  },
  {
    sequelize,
    modelName: 'Kamar',
    tableName: 'kamars',
  }
);

module.exports = Kamar;
