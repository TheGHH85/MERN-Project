/**
 * Name: authRoutes.js
 * Type: Server side (Router)
 * Description: This is the router file for the authentication routes.
 * Programmer: Zac Bondy - c0870952
 */

/********************* IMPORTS ******************/
const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/users'); // Adjust the path as needed
const router = express.Router();

/********************* ROUTES ******************/


/**
 * Route: /login (POST)
 * Description: This route is used to login a user. 
 *              It uses the passport.authenticate middleware to authenticate the user.
 *              On success, it returns a 200 status code and a JSON object containing the user 
 *              to the front end. On failure, it returns a 401 status code and a JSON object.
*/
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
        if (!user) {
            return res.status(401).json({ success: false, message: "No user exists" });
        }
        req.logIn(user, err => {
            if (err) {
                return res.status(500).json({ success: false, message: "Internal server error" });
            }
            return res.status(200).json({ success: true, message: "Successfully authenticated", user: user });

        });
    })(req, res, next);
});


/**
 * Route: /register (POST)
 * Description: This route is used to register a new user.
 *          It first checks if the user already exists in the database. If so, it returns a 401 status code.
 *         If not, it hashes the password and creates a new user. It then returns a 200 status code.
 */
router.post('/register', async (req, res) => {
    try {
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) {
            return res.send("User Already Exists");
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            email: req.body.email,
            password: hashedPassword
        });

        await newUser.save();
        res.send("User Created");
    } catch (err) {
        res.status(500).send("An error occurred");
        throw err;
    }
});

/**
 * Route: /checkAuth (GET)
 * Description: This route is used to check if a user is authenticated.
 *            If so, it returns a 200 status code and a JSON object containing the user.
 *           If not, it returns false to back to the front-end.
 */
router.get('/checkAuth', (req, res) => {
    if (req.isAuthenticated()) {
        res.status(200).json({ isAuthenticated: true, user: req.user });
    } else {
        res.status(200).json({ isAuthenticated: false });
    }
});

/**
 * Route: /logout (POST)
 * Description: This route is used to logout a user. 
 *              It uses the req.logout() function to logout the user.
 *              It then destroys the session and clears the cookie. Allowing the login credientials
 *              to be cleared fully from the browser storage. This will ensure a user as to login again
 *              when they return to the site.
 */
router.post('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ success: false, message: "Internal server error" });
            }
            res.clearCookie('connect.sid');
            return res.status(200).json({ success: true, message: "Successfully logged out" });
        });
    });
});
/**
 * Route: /user (GET)
 * Description: This route is used to see if the user info matches whats in the database.
 */
router.get('/user', (req, res) => {
    if (req.isAuthenticated()) {
        res.status(200).json({ isAuthenticated: true, user: req.user });
    } else {
        res.status(401).json({ isAuthenticated: false, message: "Not Authenticated" });
    }
});


module.exports = router;