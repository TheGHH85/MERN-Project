/**
 * Name: useSignOut.js
 * Type: Client side (Authentication/Sign out)
 * Description: This is a custom hook that is used to sign out the user. By signing out, the users credientials
 *              are removed from local storage, ensuring that they are no longer authenticated and cannot go to 
 *              any protected routes after signing out.
 * Programmer: Zac Bondy - c0870952 
 */

import { useAuth } from './Auth';
import { useNavigate } from 'react-router-dom';

/**
 * Name: useSignOut
 * Description: Calls the logout function from the Auth component and removes the user from local storage. 
 *              Then navigates back to the login page. 
 */
export const useSignOut = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const signOut = () => {
        localStorage.removeItem('user')
        logout();
        navigate('/'); // Redirect to login page
    };

    return signOut;
};
