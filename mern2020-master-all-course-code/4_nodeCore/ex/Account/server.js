// Express: 
const http    = require('http'),
    express = require('express'),
    app     = express()

// import other modules

const acc = new Account()
//the get func receives a route and a callback func
app.get('/addMoney', (req, res) => {
    // do something
});

http.createServer(app).listen(3000);
console.log("listening on port 3000");