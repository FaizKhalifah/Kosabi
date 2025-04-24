'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Rooms', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      number: {
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      ownerId: {
        type: Sequelize.UUID,
        allowNull:true
      },
      photo: {
        type:Sequelize.STRING, // untuk path foto
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    photo: {
      type:Sequelize.STRING, // untuk path foto
      allowNull: true,
    }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Rooms');
  }
};