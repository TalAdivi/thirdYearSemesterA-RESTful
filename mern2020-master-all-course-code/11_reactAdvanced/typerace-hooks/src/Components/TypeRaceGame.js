import React, { useState, useEffect } from 'react';
import '../App.css';
import { Typography, Grid, TextField, Box, Button } from '@material-ui/core';

const TypeRacerGame = () => {
  const SNIPPETS = [
    'Bears, beets, battlestar galactica',
    'What\'s Forrest Gump\'s password? 1Forrest1',
    'Where do programmers like to hangout? The Foo Bar',
  ];

  const INITIAL_GAME_STATE = { victory: false, startTime: null, endTime: null };
  const [snippet, setSnippet] = useState('Click on any snippet to start!');
  const [userText, setUserText] = useState('');
  const [inputColor, setInputColor] = useState('#6c040b');
  const [gameState, setGameState] = useState(INITIAL_GAME_STATE);

  useEffect(() => {
    if (gameState.victory)
      document.title = 'Victory!';
  });

  const updateUserText = event => {
    setUserText(event.target.value);

    if (event.target.value === snippet) {
      setInputColor('#236c0a');
      setGameState({
        ...gameState,
        victory: true,
        endTime: new Date().getTime() - gameState.startTime,
      });
    } else {
      setInputColor('#6c040b');
      setGameState({ ...gameState, victory: false });
    }
  };

  const chooseSnippet = snippetIndex => () => {
    setSnippet(SNIPPETS[snippetIndex]);
    setGameState({ ...gameState, victory: false, startTime: new Date().getTime() });
    setUserText('');
  };

  useEffect(() => {
    if (gameState.victory)
      document.title = 'Victory!';
  });

  return (
    <Grid container direction="column" style={{ minHeight: '50vh', marginTop: 10 }} justify="space-evenly" spacing={6}>
      <Grid item>
        <Box className={!gameState.victory ? 'hidden' : ''}>{gameState.victory ? `Done! 🎉 Time: ${gameState.endTime}ms` : '&nbsp;'}</Box>
      </Grid>
      <Grid item>
        <Typography variant="body1" className={!snippet.length ? 'hidden' : ''}>{snippet}</Typography>
      </Grid>
      <Grid item container justify="space-around">
        <Grid item sm={8}>
          <TextField
            label="input"
            variant="outlined"
            fullWidth value={userText}
            onChange={updateUserText}
            inputProps={{ style: { color: inputColor } }}
          />
        </Grid>
      </Grid>
      <Grid item>
        <hr />
      </Grid>
      <Grid container item direction="column" spacing={4}>
        <Grid item >
          <Typography variant="h5">Snippet: </Typography>
        </Grid>
        <Grid container item direction="row" justify="space-evenly">
          {
            SNIPPETS.map((SNIPPET, index) => (
              <Button variant="outlined" onClick={chooseSnippet(index)} key={index}>
                {SNIPPET.substring(0, 10)}...
              </Button>
            ))
          }
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TypeRacerGame;
