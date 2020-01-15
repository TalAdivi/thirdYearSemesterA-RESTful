/**                         google auth
 * 
 * need to check : https://www.npmjs.com/package/google-auth-library 
 * maybe this one : https://medium.com/@jackrobertscott/how-to-use-google-auth-api-with-node-js-888304f7e3a0
 * maybe this : https://medium.com/@jackrobertscott/how-to-use-google-auth-api-with-node-js-888304f7e3a0
 * 
 * we will get the Google user Token from them, the token is not secret
 * then, in the DB we save the token as a string and a bool "isAdmin".
 * 
 */
  
  //CHAT
  
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


