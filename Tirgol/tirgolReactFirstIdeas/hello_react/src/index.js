// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// // import App from './__App';
// import Idea from './Components/idea';
// import * as serviceWorker from './serviceWorker';
// import IdeaList from './Components/ideasList';
// import {BrowserRouter as Router} from 'react-router-dom';
// import ReactRouter from './router/router';

// ReactDOM.render(
// <Router>
//     <ReactRouter/>
// </Router>
// );

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

import React from 'react';

import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';

import { BrowserRouter as Router } from 'react-router-dom';

import ReactRouter from './router/router';

ReactDOM.render(

<Router >

<ReactRouter/>

</Router>,

document.getElementById('root')

)

serviceWorker.unregister();
