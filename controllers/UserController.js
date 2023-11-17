const { ERROR_MESSAGE } = require('../constants.js');
const {
  createUser,
  getAllUsers,
  getUserById,
  editUser,
  deleteUser,
} = require('../services/userService.js');

const UserController = {
  createUser: async (req, res) => {
    try {
      const { username, email, roles } = req.body;
      const newUser = { username, email, roles };
      const user = await createUser(newUser);
      res.status(201).send(`User ${user} created successfully`);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  },

  getUserById: async (req, res) => {
    try {
      const userId = req.params.userId;

      const user = await getUserById(userId);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json(ERROR_MESSAGE.USER_NOT_FOUND);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await getAllUsers();
      if (users) {
        res.status(200).json(users);
      } else {
        res.status(404).json(ERROR_MESSAGE.USERS_NOT_FOUND);
      }
    } catch (error) {
      console.error(ERROR_MESSAGE.GET_USERS_ERROR, error.message);
      res
        .status(500)
        .send(`${ERROR_MESSAGE.GET_USERS_ERROR}: ${error.message}`);
    }
  },

  editUser: async (req, res) => {
    const userId = req.params.userId;
    const { username, email } = req.body;
    const userChanges = { username, email };

    try {
      const updatedUser = await editUser(userId, userChanges);
      if (!updatedUser) {
        res.status(404).json(ERROR_MESSAGE.USER_NOT_FOUND);
      } else {
        res.status(200).send(updatedUser);
      }
    } catch (error) {
      console.log(ERROR_MESSAGE.EDIT_USER_ERROR, error.message);
      res
        .status(400)
        .send(`${ERROR_MESSAGE.EDIT_USER_ERROR}: ${error.message}`);
    }
  },

  setUserLicenseVerify: async (req, res) => {
    const userId = req.params.userId;
    const { isVerified } = req.query;
    const userChanges = { isVerified };

    try {
      const updatedUser = await editUser(userId, userChanges);
      if (!updatedUser) {
        res.status(404).json(ERROR_MESSAGE.USER_NOT_FOUND);
      } else {
        res.status(200).send(updatedUser);
      }
    } catch (error) {
      console.log(ERROR_MESSAGE.EDIT_USER_ERROR, error.message);
      res
        .status(400)
        .send(`${ERROR_MESSAGE.EDIT_USER_ERROR}: ${error.message}`);
    }
  },

  setUserRoles: async (req, res) => {
    const userId = req.params.userId;
    const { roles } = req.body;
    const newRoles = { roles };

    try {
      const updatedUser = await editUser(userId, newRoles);
      if (!updatedUser) {
        res.status(404).json(ERROR_MESSAGE.USER_NOT_FOUND);
      } else {
        res.status(200).send(updatedUser);
      }
    } catch (error) {
      console.log(ERROR_MESSAGE.EDIT_USER_ERROR, error.message);
      res
        .status(400)
        .send(`${ERROR_MESSAGE.EDIT_USER_ERROR}: ${error.message}`);
    }
  },

  deleteUser: async (req, res) => {
    const userId = req.params.userId;

    try {
      const result = await deleteUser(userId);
      if (!result) {
        res.status(404).send(ERROR_MESSAGE.USER_NOT_FOUND);
      } else {
        res.status(200).send(`Юзер ${result} успешно удален`);
      }
    } catch (error) {
      console.log(ERROR_MESSAGE.DELETE_USER_ERROR, error.message);
      res
        .status(401)
        .send(`${ERROR_MESSAGE.DELETE_USER_ERROR} ${error.message}`);
    }
  },
};

module.exports = UserController;
