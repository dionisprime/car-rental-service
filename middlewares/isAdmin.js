const { getUserById } = require('../services/userService.js');
const { ERROR_MESSAGE, ROLE } = require('../constants.js');

const isAuth = async (req, res, next) => {
  const authUserId = req.headers.authorization;
  try {
    const userInDataBase = await getUserById(authUserId || null);

    if (!userInDataBase) {
      return res.status(401).send(ERROR_MESSAGE.NOT_AUTHORIZED);
    }

    const isAdmin = userInDataBase.roles.includes(ROLE.ADMIN);

    if (!isAdmin) {
      return res.status(401).send(ERROR_MESSAGE.NOT_ADMIN);
    }
    console.log('hello admin');
    next();
  } catch (error) {
    console.error(ERROR_MESSAGE.INCORRECT_VALUE, error.message);
    return res
      .status(400)
      .send(`${ERROR_MESSAGE.INCORRECT_VALUE} ${error.message}`);
  }
};

module.exports = isAuth;
