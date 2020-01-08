//new!!
var tal = null;

var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

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

http.listen(3001, function () {
    console.log('listening on *:3001');
});