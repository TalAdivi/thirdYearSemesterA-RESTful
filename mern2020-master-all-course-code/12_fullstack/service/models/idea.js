const mongoose = require('mongoose');
const idea = {
  id: { type: Number, index: 1 },
  idea: String,
  group: String,
};

const ideaSchema = new mongoose.Schema(idea);
const Idea = mongoose.model('Idea', ideaSchema);
/*
// Validations:

ideaSchema
  .path('age')
  .validate(obj => obj > 18, 'Age must be above 18!');

// Setters:

ideaSchema
  .path('groups')
  .set(obj => obj.map(group => String(group).toUpperCase()));

// Pre-save:

ideaSchema
  .pre('save', next => {
    console.log('Do something before save');

    return next();
  });
*/

module.exports = Idea;
