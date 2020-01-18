const { Schema, model } = require('mongoose');

const addressSchema = new Schema({
  street: String,
  suite: String,
  city: String,
  zipcode: String,
  geo: {
    lat: Number,
    lng: Number,
  },
});

const companySchema = new Schema({
  name: String,
  catchPhrase: String,
  bs: String,
});

const userSchema = new Schema({
  id: { type: Number },
  name: { type: String, index: 1, required: true },
  username: String,
  email: String,
  age: Number,
  active: Boolean,
  address: [addressSchema],
  phone: [String],
  website: String,
  company: companySchema,
}, { collection: 'users' });

// validations
userSchema
  .path('age')
  .validate(obj => obj > 18,
    'Age must be above 18!');

// Setters:

userSchema
  .path('name')
  .set(obj => String(obj).toUpperCase());

// Pre-save:

userSchema
  .pre('save', next => {
    console.log('Do something before save');

    return next();
  });

const User = model('User', userSchema);

module.exports = User;
