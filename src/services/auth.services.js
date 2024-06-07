import axios from "axios";

class AuthService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.SERVER_URL || "http://localhost:5010",
      // baseURL: import.meta.env.VITE_API_URL || "http://localhost:5010" // THIS LINE GOES IN THE FINAL VERSION
    });

    // Setting JWT token in the headers for every request
    this.api.interceptors.request.use(
      (config) => {
        // Retrieving the token from the localStorage
        const storedToken = localStorage.getItem("authToken");

        if (storedToken) {
          config.headers = { Authorization: `Bearer ${storedToken}` };
        }
        return config;
      },
      (error) => {
        // Handle the error
        return Promise.reject(error);
      }
    );
  }

  login = (requestBody) => {
    return this.api.post("auth/login", requestBody);
  };

  signup = (requestBody) => {
    return this.api.post("auth/signup", requestBody);
  };

  verify = () => {
    return this.api.get("auth/verify");
  };
}

//creating an instance object
const authService = new AuthService();

export default authService;
