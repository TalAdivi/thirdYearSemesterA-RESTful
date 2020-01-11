const express = require('express')
const morgan = require('morgan')
const app = express()
const apiRoute = require('./router');
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use('/Help4U/task', apiRoute);
app.use('/Help4U/subject', apiRoute);
app.use('/Help4U/task', apiRoute);
module.exports = app;