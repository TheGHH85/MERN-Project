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
        setCurrentUser(user);
        localStorage.setItem('user', JSON.stringify(user));
    };
    
console.log("currentUser: ", currentUser);


const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
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