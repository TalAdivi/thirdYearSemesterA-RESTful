const express = require('express');
const app = express();
const jade = require('jade');
const ejs = require('ejs');
const port = process.env.PORT || 3000;

app.set("view", "./views");
app.set("view engine", "jade");

app.engine("jade", jade.__express);
app.engine("html", ejs.renderFile);

app.locals.username = "tal";
app.locals.password = "adivi";
app.locals.mail = "taladivi10@gmail.com";

app.get("/gallery", (req,res) => {
    res.render("user_jade");
});


app.listen(port);
console.log(`listening on port ${port}`);
