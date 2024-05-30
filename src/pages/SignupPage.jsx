import { useState } from "react";;
import axios from "axios";
import { Link, useNavigate} from "react-router-dom";
import authService from "../services/auth.services";

const API_URL = "http://localhost:5010";

function SignupPage(props){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate();

    const {storeToken, authenticateUser} = useContext(AuthContext);

    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleName = (e) => setName(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        const requestBody = {email, password, name};

        // replace axios.post
    authService.signUp(requestBody)
    .then((response)=> {
        navigate("/login");
    })
    .catch((err) => {
        let errorDesription = "An unexpected error occured";
        if(err.response && EvalError.response.data) {
            if(err.repsonse.data.message){
                errorDescription = err.response.data.message;
            } else {
                errorDescription = "An error occurred, no message provied by the server";
            }
        } else {
            errorDescription = "No response from the server";
        }
    });
};

return (
    <div className ="SignUpPage">
    <h1>Join us</h1>

    <form onSubmit={handleSignupSubmit}>
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={handleEmail} />

        <label>Password:</label>
        <input type="password" name="password" value={password} onChange={handlePassword} />

        <label>Name:</label>
        <input type="text" nmae="name" value={name} onChange={handleName} />

        <button type="submit">Sign Up</button>
    </form>
    {errorMessage && <p className="error-message">{errorMessage}</p>}

    <p>Already a Plantbuddy?</p>
    <Link to={"/login"}>Log In</Link>
</div>
);

}

export default SignupPage;