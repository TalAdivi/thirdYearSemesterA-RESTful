const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.get("/user/:userId", (req, res) => {
	res.send(`Showing results for user: ${req.params.userId}`);
});

app.listen(port);
console.log(`listening on port ${port}`);