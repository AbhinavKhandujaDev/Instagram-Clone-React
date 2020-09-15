import React, {useState, useEffect } from 'react';
import LoginSignupView from './components/login-signup/LoginSignupView';
import HomePage from './components/Home/HomePage/HomePage.jsx';
import { firebase } from './firebase';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {

  const [component, setComponent] = useState();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setComponent(<HomePage />)
      } else {
        setComponent(<LoginSignupView />)
      }
    });
  }, []);
  return (
    <div className="App flex-center">
      {component}
    </div>
  );
}

export default App;
