const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.use("/assets", express.static(`${__dirname}/public`));

app.get("/dog", (req,res) => {
	res.send(`<!doctype html>
	<html>
		<head></head>
		<body><img src="assets/images/dog.jpg"></body>
	</html>`);
});

app.get("/cat", (req,res) => {
	res.send(`<!doctype html>
	<html>
		<head></head>
		<body><img src="assets/images/cat.jpeg"></body>
	</html>`);
});

app.all("*",(req,res, next) => { // Fallback
	res.send("Only dog or cat");
});

app.listen(port);
console.log(`listening on port ${port}`);