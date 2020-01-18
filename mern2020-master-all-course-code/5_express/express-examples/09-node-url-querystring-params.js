const express = require('express');
const url = require('url');
const app = express();
const port = process.env.PORT || 8080;

app.get("/find", (req, res) => {
	const urlPart = url.parse(req.url, true);
	const query = urlPart.query;

	res.send(`Finding book by author: ${query.author}. Book's title: ${query.title}`);
});

app.listen(port);
console.log(`listening on port ${port}`);