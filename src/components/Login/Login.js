import React, { useContext, useState } from 'react';
import './login.css';
import googleLogo from '../../icon/google.png';
import fbLogo from '../../icon/fb.png';
import { initializeLoginFramework, handleGoogleSignIn, handleFbSignIn, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './LogInManager';
import { CommonData } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
const Login = () => {

    initializeLoginFramework();
    const [loggedInUser, setLoggedInUser] = useContext(CommonData);
    const [user, setUser] = useState({
        isSignedIn: false,
        firstName: '',
        lastName: '',
        displayName: '',
        email: '',
        photo: '',
        password: '',
        error: ''
    });
    const history = useHistory();
    const location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };

    const [message, setMessage] = useState({ message: '', type: '', color: '' });
    const [isHaveAccount, setIsHaveAccount] = useState(false);

    const handleResponse = (res, redirect) => {
        setUser(res);
        console.log("response ",res);
        setMessage(res.message);
        setLoggedInUser(res);
        if (redirect) {
            history.replace(from)
        }
    }

    const checkValidation = () => {
        if (isHaveAccount) {
            const logInEmail = document.getElementById("logInEmail").value;
            const password = document.getElementById("password").value;
            if (/\S+@\S+\.\S+/.test(logInEmail)) {
                if (password.length > 6 && /\d{1}/.test(password)) {
                    const newUser = user;
                    newUser.email = logInEmail;
                    newUser.password = password;
                    setUser(newUser);
                    setMessage({ message: '', color: '' })
                    return true;
                } else {
                    setMessage({ message: "Password Should Contain one digit and legth more than six", color: "red" });
                }
            } else {
                setMessage({ message: "Invalid Email Formate... Please Enter valid email", color: "red" });
            }
        } else {
            const firstName = document.getElementById("firstName").value;
            const lastName = document.getElementById("lastName").value;
            const email = document.getElementById("email").value;
            const newPassword = document.getElementById("newPassword").value;
            const confirmPassword = document.getElementById("confirmPassword").value;

            if (firstName.length > 0) {
                if (lastName.length > 0) {
                    if (/\S+@\S+\.\S+/.test(email)) {
                        if (newPassword.length > 6 && /\d{1}/.test(newPassword)) {
                            if (newPassword === confirmPassword) {
                                const newUser = user;
                                newUser.firstName = firstName;
                                newUser.lastName = lastName;
                                newUser.displayName = firstName+" "+lastName;
                                newUser.email = email;
                                newUser.password = newPassword;
                                newUser.check = "it's check";
                                setUser(newUser);
                                setMessage({ message: '', color: '' })
                                return true;
                            } else {
                                setMessage({ message: "Confirm Password do not match with New Password..", color: "red" });
                            }
                        } else {
                            setMessage({ message: "Password Should Contain one digit and legth more than six", color: "red" });
                        }
                    } else {
                        setMessage({ message: "Invalid Email Formate... Please Enter valid email", color: "red" });
                    }
                } else {
                    setMessage({ message: "Please Enter Last Name..", color: "orange" });
                }
            } else {
                setMessage({ message: "Please Enter First Name..", color: "orange" });
            }
        }
        return false;
    }

    const toggleClick = (e) => {
        e.preventDefault();
        setIsHaveAccount(!isHaveAccount);
        setMessage({ message: "", color: "" })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isHaveAccount) {
            if (checkValidation()) {
                createUserWithEmailAndPassword(user)
                    .then(res => {
                        handleResponse(res, res.success);
                    })
            }
        }
        if (isHaveAccount) {
            if (checkValidation()) {
                signInWithEmailAndPassword(user.email, user.password)
                    .then(res => {
                        handleResponse(res, res.success);
                    })
            }
        }
        e.preventDefault();
    }

    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                handleResponse(res, true);
            }).catch(error=>{

            })
    }

    const fbSignIn = () => {
        handleFbSignIn()
            .then(res => {
                handleResponse(res, true);
            }).catch(error=>{

            })
    }


    const handleBlur = (event) => {

        if (event.target.name === "firstName") {
            if (!event.target.value.length > 0)
                setMessage({ message: "Please Enter First Name..", color: "orange" });
            else
                setMessage({ message: '', color: '' })
        }
        else if (event.target.name === "lastName") {
            if (!event.target.value.length > 0)
                setMessage({ message: "Please Enter Last Name..", color: "orange" });
            else
                setMessage({ message: '', color: '' })
        }
        else if (event.target.name === "email" || event.target.name === "logInEmail") {
            if (! /\S+@\S+\.\S+/.test(event.target.value))
                setMessage({ message: "Invalid Email Formate... Please Enter valid email", color: "red" });
            else
                setMessage({ message: '', color: '' })
        }
        else if (event.target.name === "newPassword" || event.target.name === "confirmPassword") {
            const isPasswordValid = event.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(event.target.value);
            if (!(isPasswordValid && passwordHasNumber))
                setMessage({ message: "Password Should Contain one digit and legth more than six", color: "red" });
            else
                setMessage({ message: '', color: '' })
        }
    }
    return (<div className="white-background align-items-center" >
        <div className="card card-style" >
            {message.message && <h6 style={{ color: message.color }}>{message.message}</h6>}
            <form onSubmit={handleSubmit} action=""> {
                isHaveAccount ?
                    <div >
                        <h2> Login </h2>
                        <br />
                        <input type="text" className="form-control" name="logInEmail" id="logInEmail" required placeholder="Email" onBlur={handleBlur} />
                        <input type="password" className="form-control mt-2" name="password" id="password" required placeholder="Password" onBlur={handleBlur} />
                        <div className="mt-3 d-flex justify-content-between" >
                            < div >
                                <input type="checkbox" name="rememberCheck" id="rememberCheck" />
                                < label htmlFor="rememberCheck" > Remember Me ? </label>
                            </div>
                            <a href="" > Forgot Password </a>
                        </div>
                        <input type="submit" value="Login" className="commonButton" />
                        <small > Don 't have an account?<span>
                            <a onClick={toggleClick} href="#">Create an account</a></span></small>
                    </div> :
                    <div>
                        <h2> Create an account </h2>
                        <br />
                        <input type="text" className="form-control" name="firstName" id="firstName" required placeholder="Fist Name" onBlur={handleBlur} />
                        <input type="text" className="form-control mt-2" name="lastName" id="lastName" required placeholder="Last Name" onBlur={handleBlur} />
                        <input type="text" className="form-control mt-2" name="email" id="email" required placeholder="Email" onBlur={handleBlur} />
                        <input type="password" className="form-control mt-2" name="newPassword" id="newPassword" required placeholder="Password" onBlur={handleBlur} />
                        <input type="password" className="form-control mt-2" name="confirmPassword" id="confirmPassword" required placeholder="Confirm Password" onBlur={handleBlur} />

                        <input type="submit" value="Create an account" className="commonButton mt-3" />
                        <small> Already have an account ? < span > < a onClick={toggleClick} href="" > Login </a></span > </small>
                    </div>

            }

            </form> </div> <p > -- -- -- -- -- -- -- -- -- -- -- -- -- - Or-- -- -- -- -- -- -- -- -- -- -- -- -- - </p>
        <button className="form-control sign-in-with" onClick={googleSignIn}> < span > <img src={googleLogo}
            alt="" /> </span> Continue with Google</button>
        <button className="form-control sign-in-with" onClick={fbSignIn}> < span > < img src={fbLogo}
            alt="" /> </span> Continue with Facebook</button >
    </div>
    );
};

export default Login;