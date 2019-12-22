require('./db_connection');
const express = require('express');
const morgan = require('morgan');
const ctrl = require('./router');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/', ctrl);

module.exports = app;
