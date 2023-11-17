const express = require('express');
const router = express.Router();
const CarController = require('../controllers/CarController');
const isAdmin = require('../middlewares/isAdmin.js');

router.get('/', CarController.getAllCars);
router.get('/:carId', CarController.getCarById);
router.post('/', isAdmin, CarController.createCar);
router.put('/:carId', isAdmin, CarController.editCar);
router.delete('/:carId', isAdmin, CarController.deleteCar);

// Дополнительный роут:
// выводит список авто "доступных на выбраные даты"
// router.get('/available', CarController.getAvailableCars);

module.exports = router;
