const { Sequelize } = require('sequelize');
const config = require('../config/config.json'); // Path ke konfigurasi Anda
const User = require('./User');
const Kamar = require('./Kamar');

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: config.development.dialect,
  }
);

User.hasOne(Kamar, {
  foreignKey: 'userId', // Foreign key di tabel kamar
  as: 'kamar',
});

Kamar.belongsTo(User, {
  foreignKey: 'userId',
  as: 'penyewa',
});


module.exports = sequelize;
