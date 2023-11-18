const { ERROR_MESSAGE } = require('../constants.js');
const Rent = require('../models/RentModel.js');

const checkCarAvailability = (car, startDate, endDate) => {
  if (new Date(startDate) > new Date(endDate)) {
    throw new Error(ERROR_MESSAGE.DATE_CONFLICT);
  }
  // Проверяем, что машина доступна на указанные даты
  return Rent.find({
    car: car,
    $or: [
      { startDate: { $lte: endDate }, endDate: { $gte: startDate } }, // Новая аренда начинается до окончания старой
      { startDate: { $lte: startDate }, endDate: { $gte: startDate } }, // Новая аренда заканчивается после начала старой
    ],
  });
};

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
  checkCarAvailability,
};
