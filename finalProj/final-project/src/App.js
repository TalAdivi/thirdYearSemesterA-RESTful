import React from 'react';
import logo from './logo.svg';
import './App.css';
import  Dashboard  from "./Components/deshboard";
import Store from "./Components/store"

/**   clip:
 *    https://youtu.be/hiiaHyhhwBU?t=1930
 * 
 *    material UI
 *    https://material-ui.com/
 * 
 * 
 * 
 */

function App() {
  return (
    <div className="App">
      <Store>
      <Dashboard/>
      </Store>
    </div>
  );
}

export default App;


{/* <header className="App-header">
<div className="message-container"></div>
<form className="send-container">
  <input type="text" className="message-input"/> 
  <button type="submit" className="send-button">Send</button>
</form>
</header>  */}