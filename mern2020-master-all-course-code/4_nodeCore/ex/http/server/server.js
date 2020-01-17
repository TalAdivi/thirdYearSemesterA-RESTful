/* NOTE: The folders and files structure are different than the presentation example */
const fs  	= require('fs');
const http 	= require('http');
const url  	= require('url');

const ROOT_DIR = "../client/index.html";
const port = 3031;

http.createServer((req,res) => {
	const urlObj = url.parse(req.url, true, false);
	fs.readFile(ROOT_DIR, (err,data) => {
		console.log(`searching at:${ROOT_DIR}${urlObj.pathname}`);
		if(err) {
			res.writeHeader(404);
			res.end(JSON.stringify(err));
			return;
		}
		res.writeHeader(200);
		res.end(data);
	});
}).listen(port);
console.log(`listening on port ${port}`);
