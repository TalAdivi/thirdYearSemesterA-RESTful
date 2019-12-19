const express = require('express');
const app = express();
const port = 3000 | process.env.PORT
const colors = require('colors');


app.listen(port,() => {console.log(`lisetning on port ${port}`.blue)});