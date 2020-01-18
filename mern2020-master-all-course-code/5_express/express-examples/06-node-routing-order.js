const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.all("*",(req,res) => {
	res.send("Global handler");
});
app.get("/", function(req,res) {
	res.send("Server root");
});

app.listen(port);
console.log(`listening on port ${port}`);