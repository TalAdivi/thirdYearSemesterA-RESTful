import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { register } from './serviceWorker';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           {/* Edit <code>src/App.js</code> and save to reload. */}
//           Welcome Adivi
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

class App extends Component {
  constructor(props) {
    super(props);
    //use only with reqular func, with arrow func we dont need to do it 
    this.paintBlue = this.paintBlue.bind(this);
  }
  paintBlue() {
    // alert('color me blue');
    this.refs.divBlue.style.backgroundColor = this.props.color
  
  }
  render() {
    return(
      <div onClick = {this.paintBlue} ref="divBlue">click to be blue</div>
      // <div on = {this.paintBlue}>click to be blue</div>
    )
  }
}

export default App;
