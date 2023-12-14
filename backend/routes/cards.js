const cardRouter = require('express').Router();
const {
  getAllCards,
  createNewCard,
  deleteCard,
  putLike,
  removeLike,
} = require('../controllers/cards');

const auth = require('../middlewares/auth');
const { createNewCardValidation, cardIdValidation } = require('../middlewares/validation');

cardRouter.get('/cards', auth, getAllCards);

cardRouter.post('/cards', auth, createNewCardValidation, createNewCard);

cardRouter.delete('/cards/:cardId', auth, cardIdValidation, deleteCard);

cardRouter.put('/cards/:cardId/likes', auth, cardIdValidation, putLike);

cardRouter.delete('/cards/:cardId/likes', auth, cardIdValidation, removeLike);

module.exports = cardRouter;
