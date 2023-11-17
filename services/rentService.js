const Rent = require('../models/RentModel.js');

const getAllRents = () => {
  return Rent.find({}).populate('car user');
};

const getRentById = (rentId) => {
  return Rent.findById(rentId).populate('car user');
};

const createRent = async ({ car, user, startDate, endDate }) => {
  const rent = new Rent({ car, user, startDate, endDate });
  await rent.save();
  return rent;
};

const deleteRent = (rentId) => {
  return Rent.findByIdAndDelete(rentId);
};

module.exports = {
  createRent,
  getAllRents,
  getRentById,
  deleteRent,
};
