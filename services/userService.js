const User = require('../models/UserModel.js');
const { ERROR_MESSAGE } = require('../constants.js');
const { DEFAULT_ROLES } = require('../constants.js');

const getAllUsers = () => {
  return User.find({});
};

const getUserById = (userId) => {
  return User.findById(userId);
};

const createUser = async ({
  username,
  email,
  roles = DEFAULT_ROLES,
  isVerified = false,
}) => {
  if (username.length < 3 || username.length > 30) {
    throw new Error(ERROR_MESSAGE.INCORRECT_LENGTH);
  }

  const user = new User({ username, roles, email, isVerified });
  await user.save();
  return user;
};

const editUser = (userId, { username, email, isVerified, roles }) => {
  return User.findByIdAndUpdate(
    userId,
    {
      username,
      email,
      isVerified,
      roles,
    },
    { new: true }
  );
};

const deleteUser = (userId) => {
  return User.findByIdAndDelete(userId);
};

module.exports = { createUser, getAllUsers, getUserById, editUser, deleteUser };
