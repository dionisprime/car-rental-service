const { ERROR_MESSAGE } = require('../constants.js');
const {
  createRent,
  getAllRents,
  getRentById,
  deleteRent,
} = require('../services/rentService.js');
const { getCarById, editCar } = require('../services/carService.js');

const RentController = {
  getAllRents: async (req, res) => {
    try {
      const rents = await getAllRents();

      if (rents) {
        res.status(200).json(rents);
      } else {
        res.status(404).json(ERROR_MESSAGE.RENTS_NOT_FOUND);
      }
    } catch (error) {
      console.error(ERROR_MESSAGE.GET_RENTS_ERROR, error.message, error);
      res
        .status(500)
        .send(`${ERROR_MESSAGE.GET_RENTS_ERROR}: ${error.message}`);
    }
  },

  getRentById: async (req, res) => {
    try {
      const rentId = req.params.rentId;

      const rent = await getRentById(rentId);
      if (rent) {
        res.status(200).json(rent);
      } else {
        res.status(404).json(ERROR_MESSAGE.RENT_NOT_FOUND);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send(`${ERROR_MESSAGE.GET_RENT_ERROR}: ${error.message}`);
    }
  },

  createRent: async (req, res) => {
    const user = req.headers.authorization;
    try {
      const { car, startDate, endDate } = req.body;

      const carInDataBase = await getCarById(car);
      const isRented = carInDataBase.isRented;

      if (isRented) {
        return res.status(401).send(ERROR_MESSAGE.CAR_ALREADY_RENTED);
      }

      const newRent = { car, user, startDate, endDate };
      const rent = await createRent(newRent);
      await editCar(car, { isRented: true });
      res.status(201).send(`Rent ${rent} created successfully`);
    } catch (error) {
      console.error(ERROR_MESSAGE.ADD_RENT_ERROR, error);
      res.status(500).send(`${ERROR_MESSAGE.ADD_RENT_ERROR}: ${error.message}`);
    }
  },

  deleteRent: async (req, res) => {
    const rentId = req.params.rentId;

    try {
      const rentInDataBase = await getRentById(rentId);
      const carId = rentInDataBase.car;

      const result = await deleteRent(rentId);
      console.log('result: ', result);

      if (!result) {
        res.status(404).send(ERROR_MESSAGE.RENT_NOT_FOUND);
      }

      await editCar(carId, { isRented: false });
      res.status(200).send(`Рента ${result} успешно отменена. Авто свободен`);
    } catch (error) {
      console.log(ERROR_MESSAGE.DELETE_RENT_ERROR, error.message);
      res
        .status(401)
        .send(`${ERROR_MESSAGE.DELETE_RENT_ERROR} ${error.message}`);
    }
  },
};

module.exports = RentController;
