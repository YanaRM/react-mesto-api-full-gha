const cardRouter = require('express').Router();
const {
  getAllCards,
  createNewCard,
  deleteCard,
  putLike,
  removeLike,
} = require('../controllers/cards.js');

const auth = require('../middlewares/auth.js');
const { createNewCardValidation, cardIdValidation } = require('../middlewares/validation.js');

cardRouter.get('/cards', auth, getAllCards);

cardRouter.post('/cards', auth, createNewCardValidation, createNewCard);

cardRouter.delete('/cards/:cardId', auth, cardIdValidation, deleteCard);

cardRouter.put('/cards/:cardId/likes', auth, cardIdValidation, putLike);

cardRouter.delete('/cards/:cardId/likes', auth, cardIdValidation, removeLike);

module.exports = cardRouter;
