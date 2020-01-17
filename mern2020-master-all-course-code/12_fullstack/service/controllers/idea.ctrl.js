const Idea = require('../models/idea');

// for route /final-ideas/getAllIdeas
exports.getData = (req, res) => {
  Idea.find({})
    .then(docs => {
      console.log(docs);

      return res.json(docs);
    })
    .catch(err => console.log(`query error: ${err}`));
};
