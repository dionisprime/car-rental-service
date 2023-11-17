const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const isAuth = require('../middlewares/isAuth.js');
const isAdmin = require('../middlewares/isAdmin.js');

router.get('/', isAuth, UserController.getAllUsers);
router.get('/:userId', isAuth, UserController.getUserById);
router.post('/', UserController.createUser);
router.put('/:userId', isAuth, UserController.editUser);
router.delete('/:userId', isAuth, UserController.deleteUser);

router.patch('/:userId/verify', isAdmin, UserController.setUserLicenseVerify);
router.patch('/:userId/change-roles', isAdmin, UserController.setUserRoles);

module.exports = router;
