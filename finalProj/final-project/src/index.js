import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router ,Route } from 'react-router-dom';
import ReactRouter from '../src/Routers/routers'
import GoogleLogin from 'react-google-login';
import GoogleAuth from './Authentication/googleAuth';

// const responseGoogle = (response) => {
//     console.log(response);
// }

ReactDOM.render(
//     <GoogleLogin
//     clientId="838325310419-ink7dovlmgeoff0urhtdk16boctkqra8.apps.googleusercontent.com"
//     render={renderProps => (
//       <button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button>
//     )}
//     buttonText="Login"
//     onSuccess={responseGoogle}
//     onFailure={responseGoogle}
//     cookiePolicy={'single_host_origin'}
//   />
<>



<ReactRouter/>

{/* <App/> */}


     {/* <Router>
    
         <Route exact path="/homePage">
         <ReactRouter />
         </Route>

         <Route exact path="404">
         {console.log("blablabla")}
         </Route>

     </Router> */}


  </>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
