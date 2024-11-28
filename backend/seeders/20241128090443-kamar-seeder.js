'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    for(let i = 100;i<150;i++){
      await queryInterface.bulkInsert('Kamars', [
        {
         nomor: i,
         status:"tersedia",
         createdAt: new Date(),
         updatedAt: new Date()
       },
      ]
    );
      
    }
  
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Kamars', null, {});
  }
};
