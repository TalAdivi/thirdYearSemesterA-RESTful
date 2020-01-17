const mongoose = require('mongoose');

const schema = {
  name: { type: String, createIndexes: { unique: true } },
  age: Number,
  status: { type: String, required: true },
  groups: [String],
};

const user_schema = new mongoose.Schema(schema);

// Validations:

user_schema
  .path('age')
  .validate(obj => obj > 18, 'Age must be above 18!');

// Setters:

user_schema
  .path('groups')
  .set(obj => obj.map(group => String(group).toUpperCase()));

// Pre-save:

user_schema
  .pre('save', next => {
    console.log('Do something before save');

    return next();
  });

const User = mongoose.model('User', user_schema);

module.exports = User;
