const express = require('express');
const morgan = require('morgan');
require('./db_connection');
const ctrl = require('./router');
const app = express();

// bring router here

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/', ctrl);

// app.get('/posts', ctrl.getAllPosts);
// app.get('/post/:id', ctrl.getPost);
// app.put('/post/:id', ctrl.editPost);
// app.post('/post', ctrl.addPost);
// app.delete('/remove', ctrl.removePost);

module.exports = app;
