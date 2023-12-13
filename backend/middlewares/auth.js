const jwt = require('jsonwebtoken');
const NotAuthenticate = require('../errors/NotAuthenticate');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new NotAuthenticate('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    next(new NotAuthenticate('Необходима авторизация'));

    return;
  }

  req.user = payload;

  next();
};
