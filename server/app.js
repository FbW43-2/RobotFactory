const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { setCors } = require("./middleware/security");

const robotsRouter = require('./routes/robots');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(setCors);

app.use('/', robotsRouter);

module.exports = app;
