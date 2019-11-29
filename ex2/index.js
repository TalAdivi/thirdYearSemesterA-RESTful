const http = require('http')
const controller = require('./controller')
const PORT = 3031

http.createServer(controller).listen(PORT, () => { console.log(`listning on port ${PORT}`) })
