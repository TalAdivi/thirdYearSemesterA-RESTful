const http = require ('http');
const port = 8080

http.createServer((req, res) => {
	res.writeHead(200);//status code in header
	res.write("We built a server");//send res body (can write multiple times)
	res.end();//send & close connection (or use res.send once)
}).listen(port);//listen for connection on this port
console.log(`listening on port ${port}`);














// // Express: 

// var http    = require('http'),
//     express = require('express'),
//     app     = express();

// //the get func receives a route and a callback func
// app.get('/',function(req,res) {
//     res.send('Hi');
// });
// http.createServer(app).listen(3000);
// console.log("listening on port 3000");
