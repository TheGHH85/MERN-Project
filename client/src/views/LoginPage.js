/**
 * Name: LoginPage.js
 * Type: Client Side (View)
 * Description: This is the login page component that will be used to display the login page.
 * Programmer: Zac Bondy - c0870952
 */


/************************ IMPORTS *****************************/
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../authentication/Auth'; 
import Footer from '../components/footer'; 
import '../css/footer.css';


/************************ COMPONENT *****************************/

/**
 * Name: LoginForm
 * Description: Askes the user to enter their login credentials.
 *              Then it passes the info to the login function and procceeds with
 *              the authenticartion proccess. If the user is authenticated, they
 *              are redirected to the myTable page. 
 */
function LoginForm() {
    const navigate = useNavigate();
    const { login } = useAuth(); 
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const handleLogin = () => {
        axios({
            method: "POST",
            data: {
                email: loginEmail,
                password: loginPassword
            },
            withCredentials: true,
            url: "http://localhost:8080/login",
        }).then((res) => {
            if (res.data.success) {
                login(res.data.user); 
                navigate("/myTable"); 
                
            } else {
                alert("Wrong email or password, please try again");
            }
        }).catch((error) => {
            console.error("Login error:", error);
            alert("Login failed");
        });
    };

    // Redirects the user to the register page if they do not have a verified account
    const handleRegister = () => {
        navigate("/register");
    }

    return (
        <>
        <h1 className="login-h1 text-center">Welcome to Employee Database Management System</h1>
        <h3 className="login-h1 text-center">Please enter your email or password</h3>
        <div className="login-form-box">
            <div className="login-form">
                <form className="row g-3" onSubmit={handleLogin}>
                    <div className="col-6 mx-auto"> 
                        <div className="mb-3">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                onChange={(e) => setLoginEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                onChange={(e) => setLoginPassword(e.target.value)}
                            />
                        </div>
                        <div className="text-center"> 
                            <button
                                type="button"
                                className="btn btn-success btn-lg"
                                onClick={handleLogin}
                            >
                               Submit 
                            </button>

                            <button
                                type="button"
                                className="btn btn-warning btn-lg"
                                onClick={handleRegister}
                            >
                               Register 
                            </button>
                        </div>
                    </div>
                </form>
            </div>
           
        </div>
        <Footer />
    </>

);


}

export default LoginForm;
