/**
 * Name: navbar.js
 * Type: Client Side (Component)
 * Description: This is the navbar component that will be used to display the navbar on all pages.
 * Programmer: Zac Bondy - c0870952
 */

import React from 'react';
import '../css/navbar.css';


const Navbar = ({ onSignOut }) => { // Add an onSignOut prop
    return (
        <nav className="navbar navbar-expand-lg bg-primary">
            <a className="fs-2 nav-link first" href="/myTable">Project MERN</a>
            <div className="nabvar-nav">
                <a className='nav-link' href='/MyForm'>Add Employee</a>
            </div>
            <div className="nabvar-nav">
                <a className='nav-link' href='/myTable'>View Employees</a>
            </div>
            <div className="nabvar-nav">
                <a className='nav-link' onClick={onSignOut}>Sign Out</a> {/* Sign-out link */}
            </div>
        </nav>
    );
};

export default Navbar;
