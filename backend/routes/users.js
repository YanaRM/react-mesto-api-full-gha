const userRouter = require('express').Router();
const {
  createNewUser,
  login,
  getAllUsers,
  findUserById,
  getUserInfo,
  updateUserInfo,
  updateAvatar,
} = require('../controllers/users.js');

const auth = require('../middlewares/auth.js');
const {
  createNewUserValidation,
  loginValidation,
  updateUserInfoValidation,
  updateAvatarValidation,
  userIdValidation,
} = require('../middlewares/validation.js');

userRouter.post('/signup', createNewUserValidation, createNewUser);

userRouter.post('/signin', loginValidation, login);

userRouter.get('/users', auth, getAllUsers);

userRouter.get('/users/me', auth, getUserInfo);

userRouter.get('/users/:userId', auth, userIdValidation, findUserById);

userRouter.patch('/users/me', auth, updateUserInfoValidation, updateUserInfo);

userRouter.patch('/users/me/avatar', auth, updateAvatarValidation, updateAvatar);

module.exports = userRouter;
