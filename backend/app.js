require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');

// console.log(process.env.NODE_ENV);

const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const NotFound = require('./errors/NotFound');
const { createNewUser, login } = require('./controllers/users');
const { createNewUserValidation, loginValidation } = require('./middlewares/validation');
const errorHandler = require('./middlewares/error-handler');
const corsHandler = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

mongoose.connect(MONGO_URL);

app.use(helmet());
app.use(corsHandler);

app.use(bodyParser.json());

app.use(requestLogger);

app.post('/signup', createNewUserValidation, createNewUser);
app.post('/signin', loginValidation, login);
app.use(require('./routes/users'));
app.use(require('./routes/cards'));

app.use('*', (req, res, next) => {
  next(new NotFound('Страница не найдена'));
});

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT);
