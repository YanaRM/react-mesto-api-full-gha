const userRouter = require('express').Router();
const {
  createNewUser,
  login,
  getAllUsers,
  findUserById,
  getUserInfo,
  updateUserInfo,
  updateAvatar,
} = require('../controllers/users');

const auth = require('../middlewares/auth');
const {
  createNewUserValidation,
  loginValidation,
  updateUserInfoValidation,
  updateAvatarValidation,
  userIdValidation,
} = require('../middlewares/validation');

// userRouter.get('/crash-test', () => {
//   setTimeout(() => {
//     throw new Error('Сервер сейчас упадёт');
//   }, 0);
// });

userRouter.post('/signup', createNewUserValidation, createNewUser);

userRouter.post('/signin', loginValidation, login);

userRouter.get('/users', auth, getAllUsers);

userRouter.get('/users/me', auth, getUserInfo);

userRouter.get('/users/:userId', auth, userIdValidation, findUserById);

userRouter.patch('/users/me', auth, updateUserInfoValidation, updateUserInfo);

userRouter.patch('/users/me/avatar', auth, updateAvatarValidation, updateAvatar);

module.exports = userRouter;
