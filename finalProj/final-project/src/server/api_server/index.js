const app = require('./app')
const http = require('http');
const dbCon = require('./db_connection')
const port = process.env.PORT || 3000

// connect to db and to the server
http.createServer(app).listen(port, () => {
    console.log(`listening on port ${port}`);
    dbCon.then(() => {
        console.log('conncect to db')

    })
        .catch(err => {
            console.log('fail connect to db', err.message)
        });
});



