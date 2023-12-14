const userRouter = require('express').Router();
const {
  getAllUsers,
  findUserById,
  getUserInfo,
  updateUserInfo,
  updateAvatar,
} = require('../controllers/users');

const auth = require('../middlewares/auth');
const {
  updateUserInfoValidation,
  updateAvatarValidation,
  userIdValidation,
} = require('../middlewares/validation');

userRouter.get('/users', auth, getAllUsers);

userRouter.get('/users/me', auth, getUserInfo);

userRouter.get('/users/:userId', auth, userIdValidation, findUserById);

userRouter.patch('/users/me', auth, updateUserInfoValidation, updateUserInfo);

userRouter.patch('/users/me/avatar', auth, updateAvatarValidation, updateAvatar);

module.exports = userRouter;
