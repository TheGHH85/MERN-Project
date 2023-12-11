/**
 * Name: RegisterForm.js
 * Type: Client Side (View)
 * Description: This is the register page component that will be used to display the register page.
 * Programmer: Zac Bondy - c0870952
 */

/************************ IMPORTS *****************************/
import React from 'react';
import axios from 'axios';
import Footer from '../components/footer';
import { useNavigate } from 'react-router-dom';

/************************ COMPONENT *****************************/


/**
 * Name: RegisterForm
 * Description: Askes the user to enter their login credentials. Then it passes the info to the backend
 *              where it checks if a user with that email already exists. If not, it creates a new user
 *              in the database and redirects the user to the login page.
 */
function RegisterForm(){
  const navigate = useNavigate();
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
    navigate("/");
  };
  return(
    <>
    <h1 className="login-h1 text-center">Please Register to login</h1>
    <div className="login-form-box">
        <div className="login-form">
            <form className="row g-3" onSubmit={register}>
                <div className="col-6 mx-auto">
                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            onChange={(e) => setRegisterEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            onChange={(e) => setRegisterPassword(e.target.value)}
                        />
                    </div>
                    <div className="text-center">
                        <button
                            type="button"
                            className="btn btn-success btn-lg"
                            onClick={register}
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

export default RegisterForm;