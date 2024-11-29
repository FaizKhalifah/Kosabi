const express = require('express');
const { sequelize } = require('./models');
const kamarRoutes = require('./routes/kamarRoutes.js');
const authRoutes = require('./routes/authRoutes.js');

const app = express();
app.use(express.json());

app.use('/api/kamar', kamarRoutes);
app.use('/api/auth',authRoutes);

sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch((err) => console.log('Error: ' + err));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));