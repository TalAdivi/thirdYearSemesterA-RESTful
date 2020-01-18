const express = require('express');
const ideaCtl = require('./controllers/idea.ctrl');
const app = express();
const port = process.env.PORT || 3001;

app.set('port', port);
app.use('/', express.static('./public')); // for API , we can put here also the API documantation
app.use(
 (req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Headers',
     'Origin, X-Requested-With, Content-Type, Accept');
   res.set('Content-Type', 'application/json');
   next();
 });

/** * All routes ***/
app.get('/final-ideas/getAllIdeas', ideaCtl.getData);
// app.get('/final-ideas/saveNewIdea', ideaCtl.saveData);
// app.get('/final-ideas/updateIdea', ideaCtl.updateData);
// app.get('/final-ideas/deleteIdea', ideaCtl.deleteData);

app.listen(port, () => console.log(`listening on port ${port}`));