const http = require('http');
const options = {
	hostname: 'localhost',
	port: '3031',
	path: '/index.html'
};

function handlerResponse(response) {
	let serverData = '';
	response.on('data', function (chunk) {
		serverData += chunk;
	});
	response.on('end', function () {
		console.log(serverData);
	});
}

http.request(options, function (response) {
	handlerResponse(response);
}).end();
