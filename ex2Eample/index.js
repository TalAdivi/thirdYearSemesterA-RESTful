// const http = require('http');
// // const Logger = require('./Logger');
// const controller = require('./controller');
// const port = process.env.PORT || 3000;

// const server = http.createServer(controller);

// server.listen(port, () => console.log(`listening on port ${port}`));


let promise = new Promise(resolve => {
    setTimeout(() => resolve("done!"), 1000);
  });
  
  promise.then(console.log); // shows "done!" after 1 second

// server.on('request', request => Logger.newRequest(request));
