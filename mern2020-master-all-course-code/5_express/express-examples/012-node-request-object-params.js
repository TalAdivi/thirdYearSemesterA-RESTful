const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.get("/find", (req, res) => {
	console.log(`Protocol:\t: ${req.protocol}`);
	console.log(`Original url:\t: ${req.originalUrl}`);
	console.log(`IP:\t: ${req.ip}`);
	console.log(`Path:\t: ${req.path}`);
	console.log(`Method:\t: ${req.method}`);
	console.log(`Query:\t: ${JSON.stringify(req.query)}`);
	console.log(`Connection:\t: ${req.get("connection")}`);
	console.log(`Headers:\t: ${JSON.stringify(req.headers, null, 2)}`);

	res.send("User request");
});

app.listen(port);
console.log(`listening on port ${port}`);