import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './Auth'; // Ensure this path is correct

function LoginForm() {
    const navigate = useNavigate();
    const { login } = useAuth(); // Destructuring the login function from useAuth
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
              console.log("res.data.user: ", res.data.user);  
                login(res.data.user); // Update the authentication status
                console.log("BAM!");
                navigate("/myTable"); // Redirect to the myTable page
                console.log("BAM2!");
            } else {
                alert("Wrong email or password, please try again");
            }
        }).catch((error) => {
            console.error("Login error:", error);
            alert("Login failed");
        });
    };

    return (
        <div className="LoginPage">
            <h1>Login</h1>
            <input placeholder='email' onChange={e => setLoginEmail(e.target.value)} />
            <input placeholder='password' type='password' onChange={e => setLoginPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default LoginForm;
