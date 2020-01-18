import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import IdeasList from './Components/IdeasList';
import * as serviceWorker from './serviceWorker';
import ReactRouter from './router/router';

ReactDOM.render(
  <Router>
    <ReactRouter />
  </Router>, document.getElementById('root'),
);
serviceWorker.unregister();
