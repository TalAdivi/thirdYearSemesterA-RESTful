const { Schema, model } = require('mongoose');

const companySchema = new Schema({
    name: { type: String, required: true }
});


companySchema.statics.getAll = async function () {
    return this.find({}, (err) => {
      if (err) { throw err; }
    });
  }

const companyModel = model('companies', companySchema);

module.exports = companyModel;



