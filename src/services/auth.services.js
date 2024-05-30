import axios from "axios";
import { config } from "dotenv";


class AuthService {
    constructor() {
        //create a new instances of axios with a custom configuration
        this.api = axios.create({
            //setting API's base URL so that all requests use the same URL
            baseURL: import.meta.env.SERVER_URL || "http://localhost:5010"
        });

        //setting JWT token in the headers for every request
        this.api.interceptors.request.use.apply(config => {
            //retrieveing the token from the localstorage
            const storedToken = localStorage.getItem("authToken");

            if(storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}`}
            }
            return config;
        });
    }


    login = requestBody  => {
        return this.api.post("auth/login", requestBody);
    };

    signup = requestBody  => {
        return this.api.post("auth/signup", requestBody);
    };

    verify = ()  => {
        return this.api.get("auth/verify");
    };
}

//creating an instance object
const authService = new AuthService();

export default authService;