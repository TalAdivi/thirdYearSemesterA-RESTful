const express = require('express')
const morgan = require('morgan')
const ctrl = require('./controller')
const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.get('/posts', ctrl.getAllPosts)
app.get('/post/:id', ctrl.getPost)
app.put('/post/:id', ctrl.editPost)
app.post('/post', ctrl.addPost)
app.delete('/remove', ctrl.removePost)

module.exports = app;