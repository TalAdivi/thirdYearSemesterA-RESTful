const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },

})

const Post = new mongoose.model('post',postSchema);

module.exports = Post