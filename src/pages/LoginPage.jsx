import { useState, useContext } from "react";;
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

    const handleLoginSubmit = (e) => {
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
            <h1>This is the login page</h1>
            <h2>Plantbuddy credentials</h2>

            <form onSubmit={handleLoginSubmit}>
                <label>Email:</label>
                <input type="email" name="email" value={email} onChange={handleEmail} />

                <label>Password:</label>
                <input type="password" name="password" value={password} onChange={handlePassword} />
                <button type="submit">Login</button>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <h4>Not a plantbuddy yet?</h4>
            <Link to={"/signup"}>
            <button>Join us</button>
            </Link>
        </div>
    );

}

export default LoginPage;