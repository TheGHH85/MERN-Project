/**
 * Name: passportConfig.js
 * Type: Server side (Config)
 * Description: This is the configuration file for passport.js authentication.
 * Programmer: Zac Bondy - c0870952
 */


/********************* IMPORTS **************/
const User = require('./models/users');
const bcrypt = require('bcryptjs');
const localStrategy = require('passport-local').Strategy;


/********************* CONFIG **************/

/**
 * Name: passport
 * Description: This function exports the passport configuration. The config checks to see if 
 *              the user data maches the data in the database. If so, it returns the user. 
 *              else, it returns false.
 */
module.exports = function (passport) {
    passport.use(
        new localStrategy({ usernameField: 'email' }, async (email, password, done) => {
            try {
                const user = await User.findOne({ email: email });
                if (!user) {
                    return done(null, false);
                }

                const isMatch = await bcrypt.compare(password, user.password);
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            } catch (err) {
                return done(err);
            }
        })
    );
    
    passport.serializeUser((user, cb) => {
        cb(null, user.id);
    });

    passport.deserializeUser(async (id, cb) => {
        try {
            const user = await User.findOne({ _id: id });
            cb(null, user);
        } catch (err) {
            cb(err);
        }
    });
};
