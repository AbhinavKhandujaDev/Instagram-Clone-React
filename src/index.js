import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './common-files/styles.css';
import './common-files/colors.css';
import App from './App';
import allReducers from './Redux';
import { createStore } from 'redux';
import { Provider } from 'react-redux'

const store = createStore(allReducers);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);