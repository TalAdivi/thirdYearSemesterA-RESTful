const mongoose  = require('mongoose')

const schema = {
    id: { type: Number, required: true},
    userId: { type: Number, required: true },
    title: { type: String, required:true },    
    body: { type: String, required:true },
}

const post_schema = new mongoose.Schema(schema)
const Post = mongoose.model('Post', post_schema,'posts')

module.exports = Post