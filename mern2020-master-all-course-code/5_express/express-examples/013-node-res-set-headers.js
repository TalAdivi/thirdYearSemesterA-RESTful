const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.get("/", 
	(req, res, next) => {
		res.set("header-one", "Hello");
		next();
	},
	(req, res, next) => {
		res.set("header-two", "World");
		next();
	},
	(req, res, next) => {
		res.send("See the headers in your chrome console");
	}
);

app.listen(port);
console.log(`listening on port ${port}`);