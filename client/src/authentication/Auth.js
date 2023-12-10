import React, { useState, useContext, createContext, useEffect } from "react";


const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

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
    const login = (user) => {
        console.log("login being called!");
        setCurrentUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        console.log("Logging out, current user in local storage:", localStorage.getItem('user'));
    };
    
console.log("currentUser: ", currentUser);


const logout = async() => {
    console.log("logout being called!");
    console.log("Logging out, current user in local storage:", localStorage.getItem('user'));
    localStorage.removeItem('user');
    console.log("after remove item is called in local storage:", localStorage.getItem('user'));
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
            console.log("after remove item is called in local storage:", localStorage.getItem('user'));
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

    // In AuthProvider component

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