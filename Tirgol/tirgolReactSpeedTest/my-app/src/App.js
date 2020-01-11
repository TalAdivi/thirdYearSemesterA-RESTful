/**
 * 
 * 
 * contuine form slide 34 --> https://docs.google.com/presentation/d/1t6wCQ3NLy62eNu1LXV9WWdkrH9-kg7l7wH6tMREujbI/edit#slide=id.g6ccb21eb74_0_15
 * 
 */


import React, { useState, useEffect } from 'react';

const App = (props) => {

  const INITIAL_GAME_STATE = { victory: false, startTime: null, endTime: null };
  const [userText, setUserText] = useState('');
  const [snippet, setSnippet] = useState('');
  const [gameState, setGameState] = useState(INITIAL_GAME_STATE);
  const [inputColor, setInputColor] = useState('#001012');

  const SNIPPETS = [
    'Bears, beets, battlestar galactica',
    "What's Forrest Gump's password? 1Forrest1",
    'Where do programmers like to hangout? The Foo Bar'
  ];

  
  const chooseSnippet = snippetIndex => () => {
    console.log('setSnippet', snippetIndex);
    setSnippet(SNIPPETS[snippetIndex]);
    setGameState({ ...gameState, startTime: new Date().getTime() });
  };
  
  const updateUserText = event => {
    setUserText(event.target.value);
    if (event.target.value === snippet) {
      setGameState({
        ...gameState,
        victory: true,
        endTime: new Date().getTime() - gameState.startTime
      });
    }
  }
  
  useEffect(() => {
    if (gameState.victory) document.title = 'Victory!';
  });


  return (
    <div>
      <h2>Type Race</h2>
      <hr />
      <h3>Snippet</h3>
      {snippet}
      <h4>{gameState.victory ? `Done! 🎉 Time: ${gameState.endTime}ms` : null} </h4>
      <input value={userText} onChange={updateUserText} style={{color: inputColor}} />
      <hr />
      {
        SNIPPETS.map((SNIPPET, index) => (
          <button onClick={chooseSnippet(index)} key={index}>
            {SNIPPET.substring(0, 10)}...
          </button>
        ))
      }
    </div>

  )
}
export default App;
