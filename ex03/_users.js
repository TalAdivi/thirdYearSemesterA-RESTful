const { Schema, model } = require('mongoose')

const addressSchema = new Schema({
  street: String,
  suite: String,
  city: String,
  zipcode: String,
  geo: {
    lat: Number,
    lng: Number
  }
});

const companySchema = new Schema({
  name: String,
  catchPharse: String,
  bs: String

})

const userSchema = new Schema({
  id: Number,
  name: { type: String, index: 1, required: true },
  username: String,
  email: String,
  phone: [String],
  website: String,
  address: [addressSchema],
  active: Boolean,
  company: companySchema,
  age: Number
}, { collection: 'users' });
// change users input as i want (name will be in upercase)
userSchema
  .path('name')
  .set(obj => String(obj).toUpperCase());

// validate
userSchema
  .path('age')
  .validate(obj => obj > 18, 'age nmust be above 18');

// pre conditions
userSchema
  .pre('save', next => {
    console.log('do pre things ....')

    return next();
  })

const User = model('User', userSchema)

module.exports = User
