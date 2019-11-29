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

app.get('/', (req, res) => {
    res.json({page: 'index.html'})
})

app.post('/category', (req, res) => {
    res.json({page: 'category.html'})
})

app.post('/product', (req, res) => {
    res.json({page: 'product.html'})
})

app.listen(port, () => { console.log(`runing on port: ${port}`) })