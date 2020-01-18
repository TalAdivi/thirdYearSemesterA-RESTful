var http = require('http');
var port = 8080;
http.createServer(function(req, res) {
    res.writeHead(200);
    res.write('We built Node server!');
    res.end();
}).listen(port, function () {
    return console.log('listening on port' + port);
});