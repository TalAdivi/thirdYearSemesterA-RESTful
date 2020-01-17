const mongoose = require('mongoose');
const { DB_USER, DB_PASS, DB_HOST } = require('./constants');

const url = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}`;
const options = {
  useCreateIndex: true,
  useNewUrlParser: true,
};

mongoose
  .connect(url, options)
  .then(db => console.log('connected to: ', db.connection.name))
  .catch(err => console.error('some error occurred', err));
