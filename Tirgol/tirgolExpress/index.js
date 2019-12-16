const dotenv = require('dotenv')
const express = require('express')
const url = require('url')
const http = require('http')
const app = express()
const port = process.env.PORT || 3000
const jsonBody = require('./data/music.json')
const exphbs  = require('express-handlebars');
dotenv.config()

// app.get('/a?b?cd', (req,res,next) => {res.sendFile(`${__dirname}/public/index.html`)})
// app.get('/login', (req,res) => {res.send('login page')})
// app.post('/contact', (req,res) => {res.json({firstname:'Alf'})});
// app.put('/contact', (req,res) => {res.send('update contact')})
// app.delete('/contact', (req,res) => {res.send('delete contact')})


// app.get('/find/:author/:title',(req,res) => {
//     res.send(`showing author res:${req.params.author} title:${req.params.title}`)
// })

// app.param('userId',(req,res,next,value) => {
//     console.log(`ID is: ${value}`);
//     next()
// })
// app.get('/user/:userId',(req,res) => {
//     console.log(`param URL: ${req.originalUrl} IP: ${req.ip}`)
//     res.send(`user ID is: ${req.params.userId}`)
// })
// app.all('*', (req,res) => res.send('global handler for all routes'))

// app.get('/google',(req,res) => {
//     res.redirect('http://www.google.com')
// })


// app.use(express.urlencoded())
app.use(express.json())
// app.get('/playmusic/:music_id', (req, res) => {
//     const {music_id} = req.params
//     console.log('inside')
// res.send(`<html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <meta http-equiv="X-UA-Compatible" content="ie=edge">
//     <title>id is :${music_id}</title>
// </head>
// <body>
    
// </body>
// </html>`) 
// })

// app.get('/getMusicName', (req,res) => {
//     console.log(req.query)
//     let {id} = req.query;
//     console.log(id)

//     let userSong = jsonBody.songs.find((song) => {
//         console.log(`\n${song.id}`)
//         if(song.id == id){
//             return song;
//         }
//     })

//     res.json({'song name': userSong.name})

// })

// app.use('/assets', express.static(`${__dirname}/public`))
// app.get('/cat', (req,res) => {

// res.send(`    <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <meta http-equiv="X-UA-Compatible" content="ie=edge">
//     <title>Document</title>
// </head>
// <body>
// <img src="assets/1.jpg" alt="">
// </body>
// </html>`)
// })

// app.get('/dog', (req,res) => {
//   res.send(`    <html lang="en">
//   <head>
//       <meta charset="UTF-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <meta http-equiv="X-UA-Compatible" content="ie=edge">
//       <title>Document</title>
//   </head>
//   <body>
//   <img src="assets/2.jpg" alt="">
//   </body>
//   </html>`)  
//     })


// const router = express.Router();

// app.use('/api',router)

// router.use((req,res,next) => {
//     console.log('/' + req.method)
//     next()
// })

// router.get('/',(req,res) => {
//     res.json({"hello": "world"})
// })

// router.get('/songs',(req,res) => {
//     res.json({"message" : "songs route"})
// })




// app.engine('handlebars', exphbs());
// app.set('view engine', 'handlebars');

// app.get('/', function (req, res) {
//     res.render('home');
// });



// app.listen(port);
let myOb = {
    "tal" : "adivi",
    "bla" : "blabla"
}

let arr = [1, 2, 3];
console.log(arr.length)

arr.__proto__ = myOb
arr = new arr
console.log(arr.length)

// it inherits from Array.prototype?
// console.log( arr.__proto__ === Array.prototype ); // true

