const sequelize = require ('../models/index');

(async () => {
    try {
      // Testing koneksi
      await sequelize.authenticate();
      console.log('Koneksi ke database berhasil!');
    } catch (error) {
      console.error('Tidak dapat terhubung ke database:', error);
    } finally {
      await sequelize.close(); // Tutup koneksi setelah testing
    }
  })();