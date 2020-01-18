// NPM Modules
const express = require('express')
const morgan = require('morgan')

// Internal Modules
const ctrl = require('./controller')
const asyncWrapper = require('./async.wrapper')

// Establish app()
const app = express()
const port =  process.env.PORT || 3000

// Middleware(s)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

// Routes
app.get('/posts',    asyncWrapper(ctrl.getAllPosts))
app.get('/post/:id', asyncWrapper(ctrl.getPost))
app.put('/post/:id', asyncWrapper(ctrl.editPost))
app.post('/post',    asyncWrapper(ctrl.addPost))
app.post('/remove',  asyncWrapper(ctrl.removePost))

// Run the server
app.listen(port, 
    () => console.log('Express server ready for requests on:', port))
