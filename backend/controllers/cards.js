const Card = require('../models/card.js');
const {
  OK,
  CREATED
 } = require('../responseStatusCodes.js');

const AccessDenied = require('../errors/AccessDenied.js');
const NotFound = require('../errors/NotFound.js');

module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(OK).send(cards))
    .catch((err) => {
      next(err);
    });
};

module.exports.createNewCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(CREATED).send(card))
    .catch((err) => {
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
    .then(() => res.status(OK).send({ message: 'Карточка удалена' }))
    .catch((err) => {
      next(err);
    });
};

module.exports.putLike = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.status(OK).send(card))
    .catch((err) => {
      next(err);
    });
};

module.exports.removeLike = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.status(OK).send(card))
    .catch((err) => {
      next(err);
    });
};
