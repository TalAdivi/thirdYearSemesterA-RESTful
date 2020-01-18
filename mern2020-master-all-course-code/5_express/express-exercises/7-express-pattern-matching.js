const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.post("/software*", (req,res) => {
	res.send("Software");
});

app.post("/*node", (req,res) => {
	res.send("Node");
});

app.post("/react*js", (req,res) => {
	res.send("React");
});

app.all("*",(req,res, next) => {
	res.send("Try again");
});

app.listen(port);
console.log(`listening on port ${port}`);