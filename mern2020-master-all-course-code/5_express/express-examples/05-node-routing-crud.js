const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req, res) => res.send('Server root'));
app.get('/login', (req, res) => res.send('Login page'));
app.post('/contact', (req, res) => res.json({firstname: "Alf"}));
app.put('/contact', (req, res) => res.send('Update contact'));
app.delete('/contact', (req, res) => res.send('Delete contact'));

app.all('*', (req, res) => res.send('Global handler for all routes'));

app.listen(port);
console.log(`listening on port ${port}`);