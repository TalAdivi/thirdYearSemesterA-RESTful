const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.get("/tv", (req, res) => {
	app.set("json spaces", 4);
	res.status(200).json({tvShow: "Friends", characters:["Ross", "Joey", "Rachel", "Phoebe", "Chandler", "Monica"]});
});

app.get("/error", (req, res) => {
	res.status(200);
	res.json({status: false, message: "Internal Server Error"});
});

app.listen(port);
console.log(`listening on port ${port}`);