const express = require('express');
const app = express();
const jade = require('jade');
const ejs = require('ejs');
const port = process.env.PORT || 8080;

app.set("view", "./views");
app.set("view engine", "jade");

app.engine("jade", jade.__express);
app.engine("html", ejs.renderFile);

app.locals.username = "Dani";
app.locals.password = "Shovevani";
app.locals.mail = "dani@shovevani.com";

app.get("/gallery", (req, res) => {
	res.render("user_jade");
});

app.get("/products", (req, res) => {
	res.render("user_ejs.html", (err, renderData) => {
		res.send(renderData);
	});
})

app.listen(port);
console.log(`listening on port ${port}`);