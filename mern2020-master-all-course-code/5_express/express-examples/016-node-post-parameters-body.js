const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.post("/users", (req, res) => {
	console.log(`Post request: username is ${req.body.username}`);

	res.status(200).json({username: req.body.username});
});

app.listen(port);
console.log(`listening on port ${port}`);