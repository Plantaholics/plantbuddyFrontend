import { useState, useContext } from "react";;
import axios from "axios";
import { Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../context/auth.context";
import authService from "../services/auth.services";

const API_URL = "http://localhost:5010";

function LoginPage(prop){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate();

    const {storeToken, authenticateUser} = useContext(AuthContext);

    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        const requestBody = {email, password};

        // replacing axios.post
        authService.login(requestBody)
        .then((response) => {
            console.log("JWT token", response.data.authToken);
            storeToken(response.data.authToken)
            authenticateUser();
            navigate("/");
        })
        .catch((err) => {
            let errorDescription ="Unexpected error occurred";
            if (err.response && err.response.data){
                if(err.response.data.message){
                    errorDescription = err.response.data.message;
                }
            } else {
                errorDescription = "No response from the server";
            }
        });
    };

    return (
        <div className ="LoginPage">
            <h1>Plantbuddy credentials</h1>

            <form onSubmit={handleLoginSubmit}>
                <label>Email:</label>
                <input type="email" name="email" value={email} onChange={handleEmail} />

                <label>Password:</label>
                <input type="password" name="password" value={password} onChange={handlePassword} />
                <button type="submit">Login</button>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <p>Not a Plantbuddy yet?</p>
            <Link to={"/singup"}>Join us</Link>
        </div>
    );

}

export default LoginPage;