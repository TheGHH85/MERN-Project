/**
 * Name: ProtectedRoute.js
 * Type: Client side (Authentication/Routing)
 * Description: This is the protected route component that will be used to protect routes from being accessed
 *              by unauthenticated users. Otherwise they will only be able to access the login and register page.
 * Programmer: Zac Bondy - c0870952
 */

import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './Auth';
import axios from 'axios';

/**
 * Name: ProtectedRoute
 * Description: This component is used to protect routes from being accessed by unauthenticated users.
 *              It checks if the user is authenticated by making a request to the server.
 *              If the user is authenticated, it renders the child components.
 *              If the user is not authenticated, it redirects to the login page.
 */
function ProtectedRoute() {
    const { currentUser, login } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const verifyUser = async () => {
            if (!currentUser) {
                try {
                    const response = await axios.get('http://localhost:8080/checkAuth', { withCredentials: true });
                    if (response.data.isAuthenticated) {
                        login(response.data.user);
                    }
                    setIsLoading(false);
                } catch (error) {
                    console.error("Error verifying user", error);
                    setIsLoading(false);
                }
            } else {
                setIsLoading(false);
            }
        };

        verifyUser();
    }, [currentUser, login]);

    if (isLoading) {
        return <div>Loading...</div>; 
    }

    return currentUser ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoute;
