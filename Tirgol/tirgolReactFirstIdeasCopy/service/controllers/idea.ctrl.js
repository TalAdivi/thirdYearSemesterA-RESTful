const Idea = require('../models/idea');

// for route /final-ideas/getAllIdeas
exports.getData = async (req, res) => {
    try{
        const docs = await Idea.find({});
        console.log('docss\n',docs);
        return res.json(docs);
        
    }
 catch(e) {   
     return console.log('error',e); 
 }
};