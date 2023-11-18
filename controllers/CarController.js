const { ERROR_MESSAGE } = require('../constants.js');
const {
  getAvailableCars,
  getAllCars,
  getCarById,
  createCar,
  editCar,
  deleteCar,
} = require('../services/carService.js');

const CarController = {
  getAvailableCars: async (req, res) => {
    try {
      const { startDate, endDate } = req.query;

      const availableCars = await getAvailableCars(startDate, endDate);

      res.status(200).json(availableCars);
    } catch (error) {
      console.error(error);
      res.status(500).send(`${ERROR_MESSAGE.GET_CARS_ERROR}: ${error.message}`);
    }
  },

  getAllCars: async (req, res) => {
    try {
      const cars = await getAllCars();

      if (cars) {
        res.status(200).json(cars);
      } else {
        res.status(404).json(ERROR_MESSAGE.CARS_NOT_FOUND);
      }
    } catch (error) {
      console.error(ERROR_MESSAGE.GET_CARS_ERROR, error.message);
      res.status(500).send(`${ERROR_MESSAGE.GET_CARS_ERROR}: ${error.message}`);
    }
  },

  getCarById: async (req, res) => {
    try {
      const carId = req.params.carId;

      const car = await getCarById(carId);
      if (car) {
        res.status(200).json(car);
      } else {
        res.status(404).json(ERROR_MESSAGE.CAR_NOT_FOUND);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  createCar: async (req, res) => {
    try {
      const { brand, model, price } = req.body;
      const newCar = { brand, model, price };
      const car = await createCar(newCar);
      res.status(201).send(`Car ${car} created successfully`);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  },

  editCar: async (req, res) => {
    const carId = req.params.carId;
    const { brand, model, price } = req.body;
    const carChanges = { brand, model, price };

    try {
      const updatedCar = await editCar(carId, carChanges);
      if (!updatedCar) {
        res.status(404).json(ERROR_MESSAGE.CAR_NOT_FOUND);
      } else {
        res.status(200).send(updatedCar);
      }
    } catch (error) {
      console.error(ERROR_MESSAGE.EDIT_CAR_ERROR, error.message);
      res.status(500).send(`${ERROR_MESSAGE.EDIT_CAR_ERROR}: ${error.message}`);
    }
  },

  deleteCar: async (req, res) => {
    const carId = req.params.carId;

    try {
      const result = await deleteCar(carId);
      if (!result) {
        res.status(404).send(ERROR_MESSAGE.CAR_NOT_FOUND);
      } else {
        res.status(200).send(`Авто ${result} успешно удален`);
      }
    } catch (error) {
      console.log(ERROR_MESSAGE.DELETE_CAR_ERROR, error.message);
      res
        .status(401)
        .send(`${ERROR_MESSAGE.DELETE_CAR_ERROR} ${error.message}`);
    }
  },
};

module.exports = CarController;
