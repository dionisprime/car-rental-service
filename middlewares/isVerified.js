const { getUserById } = require('../services/userService.js');
const { ERROR_MESSAGE, ROLE } = require('../constants.js');

const isVerified = async (req, res, next) => {
  const authUserId = req.headers.authorization;
  try {
    const userInDataBase = await getUserById(authUserId || null);

    if (!userInDataBase) {
      return res.status(401).send(ERROR_MESSAGE.NOT_AUTHORIZED);
    }

    const isVerified = userInDataBase.isVerified;
    console.log('isVerified: ', isVerified);

    if (!isVerified) {
      return res.status(401).send(ERROR_MESSAGE.USER_NOT_VERIFIED);
    }
    console.log('hello verified user');
    next();
  } catch (error) {
    console.error(ERROR_MESSAGE.INCORRECT_VALUE, error.message);
    return res
      .status(400)
      .send(`${ERROR_MESSAGE.INCORRECT_VALUE} ${error.message}`);
  }
};

module.exports = isVerified;
