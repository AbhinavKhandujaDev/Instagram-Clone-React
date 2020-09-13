import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './common-files/styles.css';
import './common-files/colors.css';
import App from './App';
import './firebase.js';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);