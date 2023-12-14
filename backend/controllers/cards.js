const Card = require('../models/card');
const { CREATED } = require('../responseStatusCodes');

const AccessDenied = require('../errors/AccessDenied');
const NotFound = require('../errors/NotFound');
const IncorrectData = require('../errors/IncorrectData');

module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createNewCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(CREATED).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectData('Неправильно введены данные'));

        return;
      }

      next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFound('Карточка не найдена');
      }

      if (JSON.stringify(card.owner) !== JSON.stringify(req.user._id)) {
        throw new AccessDenied('Вы не можете удалять чужие карточки');
      }

      return Card.deleteOne(card);
    })
    .then(() => res.send({ message: 'Карточка удалена' }))
    .catch(next);
};

module.exports.removeLike = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send(card))
    .catch(next);
};

module.exports.putLike = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send(card))
    .catch(next);
};
