require('dotenv').config();
const { PORT } = require('./constants.js');
const express = require('express');
const app = express();

const userRoutes = require('./routes/userRoutes.js');
const carRoutes = require('./routes/carRoutes.js');
const rentRoutes = require('./routes/rentRoutes.js');

app.use(express.json());

app.use('/users', userRoutes);
app.use('/cars', carRoutes);
app.use('/rents', rentRoutes);

app.listen(PORT, () => {
  console.log(`Сервер работает на порту ${PORT}`);
});

module.exports = app;
