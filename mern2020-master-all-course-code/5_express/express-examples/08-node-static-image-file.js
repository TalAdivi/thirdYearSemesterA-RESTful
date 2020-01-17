const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.use("/assets", express.static(`${__dirname}/public`)); // Client can't see public

app.get("/", (req,res) => {
	res.send(`<!doctype html>
	<html>
		<head></head>
		<body>
			<img src="assets/images/sea.jpg"   >
		</body>
	</html>`);
});

app.all("*",(req,res, next) => { // Fallback
	res.send("Got lost? This is a friendly page :-)");
});

app.listen(port);
console.log(`listening on port ${port}`);