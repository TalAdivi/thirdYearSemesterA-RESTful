const express = require('express');
const axios = require('axios');
const moment = require('moment');
const fs = require('fs');

require('colors');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
stream = fs.createWriteStream('logs.txt', { flags: 'a' });
app.get('/tvshow', (req, res) => {
  console.log('tvshow route'.brightMagenta);
  stream.write(`${moment().format()} - Request ${req.originalUrl}\n`);

  const show = req.query.show;

  axios({
    method: 'GET',
    url: 'https://tvjan-tvmaze-v1.p.rapidapi.com/search/shows',
    headers: {
      'content-type': 'application/octet-stream',
      'x-rapidapi-host': 'tvjan-tvmaze-v1.p.rapidapi.com',
      'x-rapidapi-key': '3e55f15b95msh02af81bb037babbp1e6cbejsnfe26f5b3ab03',
    },
    params: {
      q: show,
    },
  })
    .then(response => {
      stream.write(`${moment().format()} - Response ${response.data[0].show.summary}\n`);
      res.send(response.data[0].show.summary);
    })
    .catch(error => {
      console.log('Tv show error:' + error);
      stream.write(`${moment().format()} - Error ${error}\n`);
      res.send('tvshow');
    });
});
app.get('/cocktail', (req, res) => {
  console.log('cocktail route'.brightGreen);
  stream.write(`${moment().format()} - Request ${req.originalUrl}\n`);

  const ingredient = req.query.ingredient;

  axios({
    method: 'GET',
    url: 'https://the-cocktail-db.p.rapidapi.com/filter.php',
    headers: {
      'content-type': 'application/octet-stream',
      'x-rapidapi-host': 'the-cocktail-db.p.rapidapi.com',
      'x-rapidapi-key': '3e55f15b95msh02af81bb037babbp1e6cbejsnfe26f5b3ab03',
    },
    params: {
      i: ingredient,
    },
  })
    .then(response => {
      const cocktailsList = response.data.drinks;
      const drinksArray = [];

      cocktailsList.forEach(cocktail => {
        drinksArray.push(cocktail.strDrink);
      });
      stream.write(`${moment().format()} - Response ${drinksArray}\n`);
      res.send(drinksArray);
    })
    .catch(error => {
      console.log('Cocktail error:' + error);
      stream.write(`${moment().format()} - Response ${error}\n`);
      res.send('cocktail');
    });
});
app.all('*', (req, res) => {
  if (req.originalUrl === '/favicon.ico') {
    res.send();
  } else {
    console.log('Route fallback'.bold.red);
    stream.write(`${moment().format()} - Unknown route: ${req.originalUrl}\n`);
    res.send('Global handler for all routes');
  }
});
app.listen(port);
console.log(`listening on port ${port}`.bold.cyan);
stream.write(`${moment().format()} - Server is listening on port ${port}\n`);
