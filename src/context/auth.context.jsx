import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import authService from "../services/auth.services";

// Define AuthContext only once, outside any function
const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };
    const authenticateUser = () => {
        //getting the storedToken from the localStorage
        const storedToken = localStorage.getItem("authToken");
        
        //if the token exist...
        if(storedToken) {
            authService.verify()
             .then((response) => {
                const user = response.data;
                setIsLoggedIn(true);
                setIsLoading(false);
                setUser(null);
             })
             .catch((error) => {
                setIsLoggedIn(false);
                setIsLoading(false);
                setUser(null);
                console.error("this is an error", error)
             }); 
        } else {
            //if the token is not available
            setIsLoggedIn(false);
            setIsLoading(false);
            setUser(null);
        }
    };

    const removeToken = () => {
        localStorage.removeItem("authToken");
    };

    const logOutUser = () => {
        removeToken();
        authenticateUser();
    };

    useEffect(() => {
        authenticateUser();
    }, []);

    return (
        <AuthContext.Provider
         value= {{
            isLoggedIn,
            isLoading,
            user,
            storeToken,
            authenticateUser,
            logOutUser
         }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}

export { AuthProviderWrapper, AuthContext };