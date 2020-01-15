import React from 'react';
import logo from './logo.svg';
import './App.css';

const state = {
  isSigendIn: false,
}


function getContent() {
  if (state.isSigendIn) {
    return <p>hello user, you're signed in </p>
  } else {
    return (
      <div>
        {console.log('blaaaaaaaaaaaaaaaaaaaa',window.gapi)}
        <p>You are not signed in. Click here to sign in.</p>
        <button id="loginButton">Login with Google</button>
      </div>
    )
  }

}

function componentDidMount() {
  window.gapi.load('auth2', () => {
    this.auth2 = window.AbortControllergapi.auth2.init({
      client_id: '838325310419-ink7dovlmgeoff0urhtdk16boctkqra8.apps.googleusercontent.com',
    })

    window.gapi.load('signin2', function() {
      // render a sign in button
      // using this method will show Signed In if the user is already signed in
      var opts = {
        width: 200,
        height: 50,
        onSuccess: this.onSuccess.bind(this),
      }
      window.gapi.signin2.render('loginButton', opts)
    })
  })
}

function App() {
  
  return (
    <div className="App">

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Sample App.</h2>

        {getContent()}
      </header>
    BLABLABLA
    </div>
  );
}


export default App;
