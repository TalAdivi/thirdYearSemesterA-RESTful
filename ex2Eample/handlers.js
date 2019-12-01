const songs = require('./SongsRepository');

const getSingleSong = (req, res) => {
  const { id } = req.urlObject.query;

  if (!Number.isNaN(id)) {
    const song = songs.getSong(id);

    if (song) {
      res.writeHeader(200);
      res.end(JSON.stringify(song));
    } else {
      // log and return 'song not found' error
    }
  } else {
    // log and return 'id is isNaN' error
  }
};

module.exports = {
  getSingleSong
};
