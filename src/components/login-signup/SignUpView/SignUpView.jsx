import React, { useState } from 'react';
import '../LoginView/LoginView.css';
import DefaultTextField from '../../DefaultTextField/DefaultTextField';
import DefButton from '../../DefButton/DefButton'

function SignUpView() {
    const [values, setState] = useState({
        email: "", fullname: "", username: "", password: "",
        emailError: false, fnameError: false, unameError: false, pswdError: false,
        loading: false
    });
    let url = require('../../../images/instagram-logo.png')
    return (
        <>
            <div className="LoginView default-border-box flex-center">
                <img id="logo" src={url} alt="" srcSet="" />
                <p>Sign up to see photos and videos from your friends.</p>

                <div className="fb-login flex-center">
                    <img src="https://img.icons8.com/fluent/24/000000/facebook-new.png" alt=""/>
                Login with Facebook
            </div>

                <div className="separator">
                    <div className="s311c"></div>
                    <div className="_0tv-g">OR</div>
                    <div className="s311c"></div>
                </div>

                <DefaultTextField
                    type="email"
                    placeholder="Email"
                    id="signup-email"
                    label="Email"
                    value={values.email || ''}
                    error={values.emailError}
                    onChange={(val) => {
                        setState(() => ({
                            ...values,
                            email: val
                        }));
                    }}
                />

                <DefaultTextField
                    type="text"
                    placeholder="Full Name"
                    id="signup-fname"
                    label="Full Name"
                    value={values.fullname || ''}
                    error={values.unameError}
                    onChange={(val) => {
                        console.log("val is " + val);
                        setState(() => ({
                            ...values,
                            fullname: val
                        }));
                    }}
                />

                <DefaultTextField
                    type="text"
                    placeholder="Username"
                    id="signup-uname"
                    label="Username"
                    value={values.username || ''}
                    error={values.fnameError}
                    onChange={(val) => {
                        setState(() => ({
                            ...values,
                            username: val
                        }));
                    }}
                />

                <DefaultTextField
                    type="password"
                    placeholder="Password"
                    id="signup-password"
                    label="Password"
                    value={values.password || ''}
                    error={values.passwordError}
                    onChange={(val) => {
                        setState(() => ({
                            ...values,
                            password: val
                        }));
                    }}
                />
                <DefButton text="Sign Up" type="submit" />
                <p>By signing up, you agree to our Terms , Data Policy and Cookies Policy .</p>
            </div>
        </>
    );
}
export default SignUpView;