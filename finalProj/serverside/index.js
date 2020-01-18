// api 
const app = require('./app');
const http = require('http').createServer(app);
const dbCon = require('./dal/db_connection')
const port = process.env.PORT || 3000
const io = require('socket.io')(http);

// chat logic
io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
    socket.on('chat message', function (msg, from, topic) {
        console.log(`topic: ${topic} ${from}: ${msg}`);
        io.emit('chat message', msg, from, topic);
    });

});

// connect to server and then to db
http.listen(port, () => {
    console.log(`listening on port ${port}`);
    dbCon.then(() => {
        console.log('conncect to db')

    })
        .catch(err => {
            console.log('fail connect to db', err.message)
        });
});





