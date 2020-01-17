const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.get("/google", (req, res) => {
		res.redirect("http://www.google.com");
	}
);

app.get("/google/:searchQuery", (req, res) => {
		res.redirect(`http://www.google.com/search?q=${req.params.searchQuery}`);
	}
);

app.get("/category*", (req, res) => {
		console.log("Wildcard routing");
	}
);

app.listen(port);
console.log(`listening on port ${port}`);