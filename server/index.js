/**
 * Name: index.js 
 * Type: Server side (Main)
 * Description: This is the main file of the server side. It contains the configuration 
 *              of the server, database connection, and the routes.
 * Programmer: Zac Bondy - c0870952
 */

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

/*********************** MongoDB Config *******************/

mongoose.connect('mongodb+srv://greyhathacker:Bandacoot85@cluster0.4ctydej.mongodb.net/?retryWrites=true&w=majority',
{useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));




app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(session({
    secret: 'secretcode',
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: false, // require HTTPS
        sameSite: 'lax' // the SameSite attribute
    }
}));

app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport);

/*********************** Routes *******************/
const authRoutes = require('./routes/authRoutes');
const personRoutes = require('./routes/personRoutes');

app.use(authRoutes);
app.use(personRoutes);


app.use(express.static('public'));
app.listen(8080, () => {
    console.log('Server running on port 8080');
});