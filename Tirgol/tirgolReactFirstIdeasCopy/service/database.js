const mongoose = require('mongoose');
const consts = require('./consts');

const { DB_HOST, DB_USER, DB_PASS } = consts;

const url = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}`;
const options = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
};


mongoose
 .connect(url,options)
 .then(() => console.log('connected'))
 .catch(err => console.log(`connection error: ${err}`));