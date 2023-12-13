require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');

//console.log(process.env.NODE_ENV);

const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const NotFound = require('./errors/NotFound.js');
const errorHandler = require('./middlewares/error-handler.js');
const corsHandler = require('./middlewares/cors.js');
const { requestLogger, errorLogger } = require('./middlewares/logger.js');

const app = express();

mongoose.connect(MONGO_URL);

app.use(helmet());
app.use(corsHandler);

app.use(bodyParser.json());

app.use(requestLogger);

app.use(require('./routes/users.js'));
app.use(require('./routes/cards.js'));

app.use(errorLogger);

app.use('*', (req, res, next) => {
  next(new NotFound('Страница не найдена'));
});

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
