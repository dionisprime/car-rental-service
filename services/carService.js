const Car = require('../models/CarModel.js');
const Rent = require('../models/RentModel.js');
const { ERROR_MESSAGE } = require('../constants.js');

const getAvailableCars = async (startDate, endDate) => {
  if (new Date(startDate) > new Date(endDate)) {
    throw new Error(ERROR_MESSAGE.DATE_CONFLICT);
  }

  const rentedCarsIds = await Rent.distinct('car', {
    startDate: { $lte: endDate },
    endDate: { $gte: startDate },
  });

  return await Car.find({
    _id: { $nin: rentedCarsIds },
  });
};

const getAllCars = () => {
  return Car.find({});
};

const getCarById = (carId) => {
  return Car.findById(carId);
};

const createCar = async ({ brand, model, price }) => {
  if (brand.length < 3 || brand.length > 30) {
    throw new Error(ERROR_MESSAGE.INCORRECT_LENGTH);
  }

  const car = new Car({ brand, model, price });
  await car.save();
  return car;
};

const editCar = (carId, { brand, model, price, isRented }) => {
  return Car.findByIdAndUpdate(
    carId,
    {
      brand,
      model,
      price,
      isRented,
    },
    { new: true }
  );
};

const deleteCar = (carId) => {
  return Car.findByIdAndDelete(carId);
};

module.exports = {
  createCar,
  getAvailableCars,
  getAllCars,
  getCarById,
  editCar,
  deleteCar,
};
