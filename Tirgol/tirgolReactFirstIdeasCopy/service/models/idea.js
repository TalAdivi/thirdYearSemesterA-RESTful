const mongoose = require('mongoose');

const idea = {
    id: {type:Number, index: 1},
    idea: String,
    group: String
};

const ideaSchema = new mongoose.Schema(idea);

const Idea = mongoose.model('idea',ideaSchema,"Ideas");

module.exports = Idea;