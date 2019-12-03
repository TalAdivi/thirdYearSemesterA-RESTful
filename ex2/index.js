const dotenv = require('dotenv').config();
const http = require('http');
const controller = require('./controller');
const PORT = process.env.PORT || 3031;

http.createServer(controller).listen(PORT, () => { console.log(`listning on port ${PORT}`) })
