const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.all("*",(req,res, next) => {
	console.log("1- All route");
	next();
});
app.get("/", (req,res) => {
	console.log("2- Get route");
	res.send({result: "WOW!"});
});

app.listen(port);
console.log(`listening on port ${port}`);