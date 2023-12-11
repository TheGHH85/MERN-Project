/**
 * Name: Auth.js
 * Type: Client side (Authentication)
 * Description: This is the authentication component that will be used to handle the authentication 
 *              procces of the user. This component will be used to handle the login and logout as well as 
 *              verifying the user.
 * Programmer: Zac Bondy - c0870952
 */

import React, { useState, useContext, createContext, useEffect } from "react";
const AuthContext = createContext(null);
/**
 * Name: useAuth
 * Description: Custom hook to access the authentication context.
 */
export function useAuth() {
  return useContext(AuthContext);
}

/**
 * Name: AuthProvider
 * Description: Provider component for the authentication context.
 */
export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(() => {
        try {
            const storedUser = localStorage.getItem('user');
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (error) {
            console.error("Error parsing user from local storage", error);
            return null;
        }
    });

    /**
     * Name: login
     * Description: Logs in the user and stores the user data in local storage.
     */
    const login = (user) => {
        console.log("login being called!");
        setCurrentUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        console.log("Logging out, current user in local storage:", localStorage.getItem('user'));
    };
    
    console.log("currentUser: ", currentUser);

    /**
     * Name: logout
     * Description: Logs out the user and clears the user data from local storage.
     */
    const logout = async() => {
        localStorage.removeItem('user');
        setCurrentUser(null);
        try {
            const response = await fetch('http://localhost:8080/logout', {
                method: 'POST',
                credentials: 'include' // important to include credentials for cookies to be sent
            });
            const data =  response.json();
            console.log("Server logout response:", data);

            if (data.success) {
                // Clear client-side storage and state
                localStorage.removeItem('user');
                setCurrentUser(null);
                
            } else {
                console.error("Logout failed on server:", data.message);
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }   
    };

    const value = {
        currentUser,
        login,
        logout
    };

    /**
     * Name: verifyUser
     * Description: Verifies the user's authentication status by making a request to the server.
     */
    const verifyUser = async () => {
        try {
            const response = await fetch('http://localhost:8080/user', { 
                credentials: 'include' // to ensure cookies are sent with the request
            });
            const data = await response.json();
            if (data.isAuthenticated) {
                setCurrentUser(data.user);
            } else {
                setCurrentUser(null);
            }
        } catch (error) {
            console.error("Error fetching user data", error);
            setCurrentUser(null);
        }
    };

    useEffect(() => {
        verifyUser();
    }, []);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}