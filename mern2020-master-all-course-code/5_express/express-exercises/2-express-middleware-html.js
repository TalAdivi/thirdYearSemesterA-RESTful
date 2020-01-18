const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.all('*', (req, res, next) => { // FALLBACK
  console.log('logged in');
  // If db returns true --> next, if false --> send err msg:login failed
  req.next();
});

app.get('/myprofile', (req, res) => {
  console.log('myprofile');
  
  res.send(`<!doctype html>
    <html>
  		<head>
        <title></title>
      </head>
  		<body style="background: #44619d">
  			<h1 style="color: #ffffff">Welcome!</h1>
  		</body>
    </html>`);
});

app.listen(port, () => console.log(`Express server listening on port ${port}!`));