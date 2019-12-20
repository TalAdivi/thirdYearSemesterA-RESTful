const mongoose = require('mongoose')
const consts = require('./constants')
const Post = require('./_posts')

const { DB_HOST } = consts
const url = DB_HOST
const options = {
  useNewUrlParser: true, // For deprecation warnings
  useCreateIndex: true, // For deprecation warnings
  useUnifiedTopology: true

}

module.exports = {
  getAllPosts(req, res, next) {
    mongoose
      .connect(url, options)
      // .then(async () => {
      //   // Query goes here
      //   const result = await Post.find({})

      //   if (result) res.json(result)
      //   else res.status(404).send('not found')
      // })
      .then(new Promise((resolve, reject) => {
        const result = Post.find({})
        if(result) {
          resolve('done');
        }

        reject('error');
      }).then( res => console.log(res)).catch(rej => console.log(rej))
      .catch(err => {
        console.error('some error occurred', err)
        res.status(500).send(err.message)
      })
  },
  getPost(req, res, next) {
    mongoose
      .connect(url, options)
      .then(async () => {
        const { id = null } = req.params
        // Query goes here
        const result = await Post.findOne({ id })

        if (result) res.json(result)
        else res.status(404).send('not found')
      })
      .catch(err => {
        console.error('some error occurred', err)
        res.status(500).send(err.message)
      })
  },
  editPost(req, res, next) {
    mongoose
      .connect(url, options)
      .then(async () => {
        const { id = null } = req.params
        const { title = null, body = null } = req.body
        // Query goes here
        const result = await Post.updateOne({ id }, { body, title })

        if (result) res.json(result)
        else res.status(404).send('not found')
      })
      .catch(err => {
        console.error('some error occurred', err)
        res.status(500).send(err.message)
      })
  },
  addPost(req, res, next) {
    mongoose
      .connect(url, options)
      .then(async () => {
        const {
          id = null,
          userId = null,
          title = null,
          body = null
        } = req.body
        // Query goes here

        const post = new Post({ id, userId, title, body })
        const result = await post.save()

        if (result) res.json(result)
        else res.status(404).send('not found')
      })
      .catch(err => {
        console.error('some error occurred', err)
        res.status(500).send(err.message)
      })
  },
  removePost(req, res, next) {
    mongoose
      .connect(url, options)
      .then(async () => {
        const { id = null } = req.body
        // Query goes here
        const result = await Post.deleteOne({ id })

        if (result) res.json(result)
        else res.status(404).send('not found')
      })
      .catch(err => {
        console.error('some error occurred', err)
        res.status(500).send(err.message)
      })
  }
}
