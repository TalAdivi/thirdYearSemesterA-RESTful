const express = require('express');
const app = express();
const url = require('url');
const songsJson = require("./data/music.json"); /* Load the songs data */
const port = process.env.PORT || 8080;

app.get("/getMusicName", (req, res) => {
	const urlPart = url.parse(req.url, true);
	const songId = urlPart.query.songId;

	const foundSong = songsJson.songs.find(song => {
		return song.id == songId;
	});

	if (foundSong) {
		res.status(200).json({"Song name": foundSong.name});
	} else {
		res.status(200).json({"Error": "Song not found"});
	}
});

app.listen(port);
console.log(`listening on port ${port}`);