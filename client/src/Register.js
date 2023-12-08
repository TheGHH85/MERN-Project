import React from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
function RegisterForm(){

  const [registerEmail, setRegisterEmail] = React.useState("");
  const [registerPassword, setRegisterPassword] = React.useState("");
  const register = () => {
    axios({
      method: "POST",
      data: {
        email: registerEmail,
        password: registerPassword
      },
      withCredentials: true,
      url: "http://localhost:8080/register",
    }).then((res) => console.log(res));
  };
  return(
    <div className="LoginPage">
      <h1>Register</h1>
      <input placeholder='email' onChange={e => setRegisterEmail(e.target.value)}/>
      <input placeholder='password' onChange={e => setRegisterPassword(e.target.value)}/>
      <button onClick={register}>Register</button>
    </div>
  );
}

export default RegisterForm;