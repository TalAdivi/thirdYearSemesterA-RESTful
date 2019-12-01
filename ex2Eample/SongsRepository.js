const { EventEmitter } = require('events');
const songsJson = require('./data/songs.json');

class SongsRepository extends EventEmitter {
    constructor() {
      super();
      this._songs = songsJson;
    }
  
    getSong(id) {
      this.emit("singleSong", this._songs[id-1]); // Fire event
  
      return this._songs[id-1];
    }
  }
  
  const songsRepo = (new SongsRepository())
    .on('singleSong', data => console.log(`Get single song: ${data.song}`)); // Catch event
  
  module.exports = songsRepo;
