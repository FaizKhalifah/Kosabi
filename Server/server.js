import express from "express";
import sequelize from "./models/index.js";

const app = express();
app.use(express.json());

sequelize.sync({ force: false }) // Jangan hapus tabel lama (opsional)
  .then(() => console.log('Database dan tabel sinkron!'))
  .catch(err => console.error('Gagal sinkronisasi:', err));

// Routes
app.get('/', (req, res) => res.send('API berjalan!'));

const PORT = 3000;
app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));