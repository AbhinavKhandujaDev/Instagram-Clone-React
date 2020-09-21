import React, { useState, useEffect } from 'react';
import LoginSignupView from './components/login-signup/LoginSignupView';
import HomePage from './components/Home/HomePage/HomePage.jsx';
import { firebase } from './FirebaseFiles/firebase';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {

  const [component, setComponent] = useState();
  useEffect(() => {
    let user = localStorage.getItem('user')

    if (user != null) {
      setComponent(<HomePage />);
      return;
    }

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        localStorage.setItem('user', user.uid);
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
