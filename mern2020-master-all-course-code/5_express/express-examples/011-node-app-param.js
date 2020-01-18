const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.param("userId", (req, res, next, value) => {
	console.log(`request received with userId ${value}`);
	next();
})

app.get("/user/:userId", (req, res) => {
	console.log(`Param url: ${req.originalUrl}`);
	res.send(`Showing results for user: ${req.params.userId}`);
});

app.listen(port);
console.log(`listening on port ${port}`);