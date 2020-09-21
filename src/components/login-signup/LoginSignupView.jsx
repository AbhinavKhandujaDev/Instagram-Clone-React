import React, { useState } from 'react';
import LoginView from './LoginView/LoginView';
import SignUpView from './SignUpView/SignUpView';
import './LoginSignupView.css';

function LoginSignupView(props) {
    let [isLogin, setState] = useState(true);

    function changeState() {
        setState(prevState => isLogin = !prevState);
    }

    let accText = isLogin ? "Don't have an account?" : "Have an account?"
    let btnTxt = isLogin ? "Sign up" : "Log in"

    return (
        <div className="lsmain flex-center">
            <img className="left-img" src={require('../../images/mobile-frame-image.png')} alt="" srcSet="" />
            <div className="LoginSignupView flex-center lsStyle">
                {isLogin ? <LoginView/> : <SignUpView/>}
                <div style={{ width: '100%' }} className="default-border-box">
                    <p className="flex-center lsSwitch">
                        {accText}
                        <span className="signUpStyle" onClick={changeState}> {btnTxt} </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginSignupView;