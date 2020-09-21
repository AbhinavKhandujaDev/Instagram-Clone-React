import React, { useState } from 'react';
import './LoginView.css';
import DefaultTextField from '../../DefaultTextField/DefaultTextField';
import DefButton from '../../DefButton/DefButton'
import { firebase } from "../../../FirebaseFiles/firebase";
import { logo } from "../../../common-files/image-urls";
import {emailRegex, passwordRegex} from "../../../common-files/regex-patterns.js"

function isValidData(isLogin, data) {
    let { email, fullName, username, password, isActive } = data
    if (isLogin) {
        if (email === undefined || password === undefined) { return false; }
        return (email.match(emailRegex) && password.length >= 6);
    } else {
        if (email === undefined || password === undefined || fullName === undefined || username === undefined) { return false; }
        return (email.match(emailRegex) && fullName != null && username.length > 3 && password.match(passwordRegex) && isActive);
    }
}

function LoginView() {
    const [values, setState] = useState({
        email: "",
        password: "",
        emailError: false,
        pswdError: false,
        loading: false,
        isActive: false,
    });

    let onLogin = (e) => {
        if (!isValidData(true, values)) { return; }
        setState(() => ({...values, loading: true }));

        firebase.auth().signInWithEmailAndPassword(values.email, values.password).then(resp => {
            setState(() => ({ ...values, loading: false, pswdError: false, emailError: false}));
        }).catch(function (error) {
            let obj = { ...values, loading: false };
            setState(() => {
                let cond = error.message.includes('password')
                return cond ? { ...obj, pswdError: true } : { ...obj, emailError: true }
            });
        });
    }

    return (
        <>
            <div className="LoginView default-border-box flex-center">
                <img id="logo" src={logo} alt="" srcSet="" />
                <DefaultTextField
                    type="email"
                    placeholder="Email"
                    id="login-email"
                    label="Email"
                    error={values.emailError}
                    value={values.email || ''}
                    onChange={(val) => {
                        setState(() => {
                            let obj = { ...values, email: val };
                            values.isActive = isValidData(true, obj);
                            return (obj)
                        });
                    }}
                />
                <DefaultTextField
                    type="password"
                    placeholder="Password"
                    id="login-password"
                    label="Password"
                    value={values.password || ''}
                    error={values.pswdError}
                    onChange={(val) => {
                        setState(() => {
                            let obj = { ...values, password: val };
                            values.isActive = isValidData(true, obj);
                            return (obj);
                        });
                    }}
                />
                <DefButton
                    text="Log In"
                    type="submit"
                    showLoader={values.loading}
                    isActive={values.isActive}
                    onPress={onLogin} />

                <div className="separator">
                    <div className="s311c"></div>
                    <div className="_0tv-g">OR</div>
                    <div className="s311c"></div>
                </div>

                <div className="fb-login flex-center">
                    <img src="https://img.icons8.com/fluent/24/000000/facebook-new.png" />
                Login with Facebook
            </div>
                <p>Forgot password?</p>
            </div>
        </>
    );
}

export default React.memo(LoginView);