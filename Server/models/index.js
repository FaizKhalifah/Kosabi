import { Sequelize } from "sequelize";
import "dotenv/config"

const database = process.env.DB_NAME;
const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const dialect = process.env.DB_DIALECT;

// Konfigurasi koneksi ke database PostgreSQL
const sequelize = new Sequelize(database,username,password,{
  host: host,
  dialect: dialect,
  port:port
});

async function testConnection() {
    try {
      await sequelize.authenticate();
      console.log('Koneksi ke database berhasil!');
    } catch (error) {
      console.error('Gagal terhubung ke database:', error);
    }
  }
  
  // Panggil fungsi untuk mengetes koneksi
  testConnection();


export default sequelize
