const express = require('express');
const router = express.Router();
const RentController = require('../controllers/RentController');
const isAuth = require('../middlewares/isAuth.js');
const isVerified = require('../middlewares/isVerified.js');
const isAdmin = require('../middlewares/isAdmin.js');

router.get('/', isAuth, RentController.getAllRents);
router.get('/:rentId', isAuth, RentController.getRentById);
router.post('/', isVerified, RentController.createRent);
router.delete('/:rentId/cancel', isAuth, RentController.deleteRent);
//----------------
// router.post('/', isAdmin, RentController.addRentHistory);
// router.delete('/:rentId', isAdmin, RentController.deleteRent);

module.exports = router;
