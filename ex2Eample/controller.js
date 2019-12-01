const url = require('url');
const { getSingleSong } = require('./handlers');

module.exports = (req, res) => {
    console.log(`Request ${req.method} came from ${req.url}`);

    const urlObject = url.parse(req.url, true, false);
    req.urlObject = urlObject;

    switch (req.method) {
        case 'GET':
            if (urlObject.path.startsWith('/getSingleSong')) {
                getSingleSong(req, res);
            }
        default: 
            // Log the error
    }
};
