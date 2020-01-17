const url = require('url');
const { getAllData, getSingleData, errorHandler, insertNewData } = require('./handlers');

module.exports = (req, res) => {
  const urlObject = url.parse(req.url, true, false);

  req.urlObject = urlObject;

  switch (req.method) {
    case 'GET':
      if (urlObject.path === '/getAllData')
        getAllData(req, res);
      else if (urlObject.pathname === '/getSingleData' && urlObject.query)
        getSingleData(req, res);
      else
        errorHandler(req, res);

      break;
    case 'POST':
      if (urlObject.pathname === '/insertNewData')
        insertNewData(req, res);
      else
        errorHandler(req, res);

      break;
  }
};
