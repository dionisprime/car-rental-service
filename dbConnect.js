const { DB_CONNECTION_URL } = require('./constants.js');

const mongoose = require('mongoose');
mongoose.connect(DB_CONNECTION_URL);

module.exports = mongoose;
