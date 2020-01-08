import React from 'react';
import logo from './logo.svg';
import './App.css';

// function App() {

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//          Welcome Adivi
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

// const App = () => {
//   const paintBlue = () => {
//     alert("Color me blue");
//   }

//   return(
//     <div onClick = {paintBlue}>click to be blue</div>
//   )
// }

class App extends React.Component {
  constructor(props) {
    super(props);
    this.paintBlue = this.paintBlue.bind(this);
  }

  paintBlue() {
    this.refs.blueDiv.style.backgroundColor = this.props.color;
    alert(`Color me blue for ${this.props.color} for project ${this.props.proj}`);
  }

  render() {
    return (
      <div onClick={this.paintBlue} ref="blueDiv">Click to be blue</div>
    )
  }
}

export default App;
