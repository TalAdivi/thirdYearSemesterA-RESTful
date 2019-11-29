const http = require('http')
const express = require('express')
const app = express()
const port = process.env.PORT || 8080
app.use(express.json())
// http.createServer(app).listen(port,()=>{
//     console.log('opened')
// })

app.set('key', 'val')
app.get('/users', (req, res) => {
    res.send('ok')
})

app.all('*', (req, res, next) => {
    console.log('MESSAGE')
    next() //its like continue in switch case
})

app.get('/myProfile/:name?key=val', (req, res, next) => {
    const {name} = req.params
    console.log(req.params)
    res.send(`
    
    <html>
    <body style = "background: #44619d>
        <h1 style = "color: #ffffff"> Welcome ${name} </h1>
    
    </body>
    </html>
    `)
})

app.listen(port, () => { console.log(`runing on port: ${port}`) })