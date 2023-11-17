const mongoose = require('../dbConnect.js');

const rentalHistorySchema = new mongoose.Schema({
  car: { type: 'ObjectId', ref: 'Car' },
  user: { type: 'ObjectId', ref: 'User' },
  startDate: Date,
  endDate: Date,
});

const Rent = mongoose.model('Rent', rentalHistorySchema);
module.exports = Rent;
