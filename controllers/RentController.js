const { ERROR_MESSAGE } = require('../constants.js');
const {
  createRent,
  getAllRents,
  getRentById,
  deleteRent,
  checkCarAvailability,
} = require('../services/rentService.js');

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
    try {
      const user = req.headers.authorization;
      const { car, startDate, endDate } = req.body;

      // Проверяем, что машина доступна на указанные даты
      const isCarAvailable = await checkCarAvailability(
        car,
        startDate,
        endDate
      );

      if (isCarAvailable.length > 0) {
        return res.status(400).send(ERROR_MESSAGE.CAR_OCCUPIED);
      }

      const newRent = { car, user, startDate, endDate };
      const rent = await createRent(newRent);
      res.status(201).send(`Rent ${rent} created successfully`);
    } catch (error) {
      console.error(ERROR_MESSAGE.ADD_RENT_ERROR, error);
      res.status(500).send(`${ERROR_MESSAGE.ADD_RENT_ERROR}: ${error.message}`);
    }
  },

  deleteRent: async (req, res) => {
    const rentId = req.params.rentId;

    try {
      const result = await deleteRent(rentId);

      if (!result) {
        res.status(404).send(ERROR_MESSAGE.RENT_NOT_FOUND);
      }

      res.status(200).send(`${ERROR_MESSAGE.DELETE_RENT_OK} ${result}`);
    } catch (error) {
      console.log(ERROR_MESSAGE.DELETE_RENT_ERROR, error.message);
      res
        .status(401)
        .send(`${ERROR_MESSAGE.DELETE_RENT_ERROR} ${error.message}`);
    }
  },
};

module.exports = RentController;
