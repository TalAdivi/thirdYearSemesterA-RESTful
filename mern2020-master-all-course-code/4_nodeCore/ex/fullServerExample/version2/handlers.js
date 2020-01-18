const users = require('./UsersRepository');

const errorHandler = (req, res, ...params) => {
  if (params.length) {
    users.emit('error', 'id not found!');
    res.writeHeader(404);
    res.write('Bad request');

    res.end();
  } else {
    res.writeHeader(404);
    res.write('Bad request');

    res.end();
  }
};

module.exports = {
  errorHandler,
  getAllData(req, res) {
    res.writeHeader(200);
    res.end(JSON.stringify(users.users));
  },
  getSingleData(req, res) {
    const { id } = req.urlObject.query;

    if (!Number.isNaN(id) && users.getUser(id - 1)) {
      res.writeHeader(200);
      res.end(JSON.stringify(users.getUser(id - 1)));
    } else {
      errorHandler(req, res, { id });
    }
  },
  insertNewData(req, res) {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString(); // convert Buffer to string
    });
    req.on('end', () => {
      const newDataItem = JSON.parse(body);

      users.newUser = newDataItem;
      users.emit('log', body);

      res.end('ok');
    });
  },
};
