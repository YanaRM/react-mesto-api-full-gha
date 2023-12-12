const bcrypt = require('bcrypt');

const saltRounds = 10;
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const {
  OK,
  CREATED,
  MONGO_DUPLICATE_ERROR_CODE,
} = require('../responseStatusCodes.js');

const NotFound = require('../errors/NotFound.js');
const ExistingEmail = require('../errors/ExistingEmail.js');
const NotAuthenticate = require('../errors/NotAuthenticate.js');
const IncorrectData = require('../errors/IncorrectData.js');

module.exports.createNewUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, saltRounds)
    .then((hash) => User.create({ name, about, avatar, email, password: hash }))
    .then((user) => {
      res
        .status(CREATED)
        .send({
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          email: user.email,
        });
    })
    .catch((err) => {
      if (err.code === MONGO_DUPLICATE_ERROR_CODE) {
        next(new ExistingEmail('Такой пользователь уже существует'));

        return;
      }

      if (err.name === 'ValidationError') {
        next(new IncorrectData('Неправильно введены данные'));

        return;
      }

      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new NotAuthenticate('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          return Promise.reject(new NotAuthenticate('Неправильные почта или пароль'));
        }

        const token = jwt.sign(
          { _id: user._id },
          'some-secret-key',
          { expiresIn: '7d' },
          );

        return res.status(OK).send({ token });
      });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.status(OK).send(user))
    .catch((err) => {
      next(err);
    });
};

module.exports.findUserById = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFound('Запрашиваемый пользователь не найден');
      }
      res.status(OK).send(user);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.status(OK).send(user);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .then((user) => res.status(OK).send(user))
    .catch((err) => {
      next(err);
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .then((user) => res.status(OK).send(user))
    .catch((err) => {
      next(err);
    });
};
