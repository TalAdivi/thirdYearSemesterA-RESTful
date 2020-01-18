const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

 app.get('/playmusic/:music_id', (req, res) => {
  const {music_id = null} = req.params;

   console.log('music_id is ', music_id);

   res.send(`<!doctype html>
        <html>
     		<head>
            	<title>Music id ${music_id}</title>
     		</head>
     		<body>
            <h1>Hello :-)</h1>
          </body>
        </html>`);
});

app.listen(port, () => console.log(`Express server listening on port ${port}!`));