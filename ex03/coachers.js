const { Schema, model } = require('mongoose')

const coacherSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  coachName: {
    type: String,
    required: true
  },
  teamName: {
    type: String,
    required: true
  },
  won: {
    type: Number,
    required: true
  },
  lost: {
    type: Number,
    required: true
  }
});

coacherSchema.statics.isExist = async function (id) {
  return this.find({ id: id }, (err, arr) => {
    if (err) { throw err; }
  });
}

coacherSchema.statics.getAll = async function () {
  return this.find({}, (err) => {
    if (err) { throw err; }
  });
}
/**
 *
 *
 *
 */

const Coacher = model('coacher', coacherSchema, 'coachers');
module.exports = Coacher;
