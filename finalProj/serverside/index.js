
/**
 * 
 * @author Tal-Adivi 
 * @author Tomer-Bar
 *  
 * 
 * @project 
 * server side
 *  
 *  */ 


 require('dotenv').config();
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
        console.log('socket.chats disconnect\n',socket.chats);
        
       
    });
    socket.on('chat message', function (msg, from, topic, chats) {
        console.log(`topic: ${topic} ${from}: ${msg}`);
        io.emit('chat message', msg, from, topic);

    });

    // every message sent, we update the chat property of the socket, when user disconnect we will post the new chat 
    socket.on('update chat',function (chats) {
        socket.chats = chats;
        
    }) 
        
        
    



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





