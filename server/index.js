var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var mongoose = require('mongoose');

var passport = require('passport');
var passportLocal = require('passport-local').Strategy; 
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const User = require('./models/user');



const passportLocalMongoose = require('passport-local-mongoose');







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



app.post('/login', (req, res, next) => {
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
app.post('/register', async (req, res) => {
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
        // Handle any errors that occur during the process
        res.status(500).send("An error occurred");
        throw err;
    }
});

app.get('/checkAuth', (req, res) => {
    if (req.isAuthenticated()) {
        res.status(200).json({ isAuthenticated: true, user: req.user });
    } else {
        res.status(200).json({ isAuthenticated: false });
    }
});

  
app.get('/user', (req, res) => {
    if (req.isAuthenticated()) {
        res.status(200).json({ isAuthenticated: true, user: req.user });
    } else {
        res.status(401).json({ isAuthenticated: false, message: "Not Authenticated" });
    }
});

app.post('/logout', (req, res) => {
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





var personSchema = mongoose.Schema({
    lastName: String,
    firstName: String,
    dateOfBirth: String,
    address1: String,
    address2: String,
    city: String,
    postalCode: String,
    country: String,
    phone: String,
    email: String,
    notes: String
});


const loginSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

loginSchema.plugin(passportLocalMongoose);

const Person = mongoose.model("Person", personSchema);
const Login = mongoose.model("Login", loginSchema);









  
  
app.post('/persons', function (req, res) {
    const personInfo = req.body;

    const newPerson = new Person({
        lastName: personInfo.lastName,
        firstName: personInfo.firstName,
        dateOfBirth: personInfo.dateOfBirth,
        address1: personInfo.address1,
        address2: personInfo.address2,
        city: personInfo.city,
        postalCode: personInfo.postalCode,
        country: personInfo.country,
        phone: personInfo.phone,
        email: personInfo.email,
        notes: personInfo.notes
    });

    newPerson.save()
        .then(() => {
            res.status(200).json({ message: 'Person added successfully' });
        })
        .catch(err => {
            res.status(500).json({ error: 'Database error' });
        });
});

app.get('/persons', function (req, res) {
    Person.find({})
        .then(persons => {
            res.status(200).json({ persons: persons || [] });
        })
        .catch(err => {
            res.status(500).json({ error: 'Database error' });
        });
});

app.get('/update/:id', function (req, res) {
    const personId = req.params.id;

    Person.findById(personId)
        .then(person => {
            res.status(200).json({ person: person });
        })
        .catch(err => {
            res.status(500).json({ error: 'Database error' });
        });
});

app.put('/update/:id', function (req, res) {
    const personId = req.params.id;

    Person.findByIdAndUpdate(personId, req.body)
        .then(updatedPerson => {
            res.status(200).json({ message: 'Person updated successfully' });
        })
        .catch(err => {
            res.status(500).json({ error: 'Database error' });
        });
});

app.post('/update/:id', function (req, res) {
    const personId = req.params.id;
    const updatedPersonInfo = req.body;

    Person.findByIdAndUpdate(personId, updatedPersonInfo)
        .then(updatedPerson => {
            res.status(200).json({ message: 'Person updated successfully' });
        })
        .catch(err => {
            res.status(500).json({ error: 'Database error' });
        });
});

app.post('/delete/:id', function (req, res) {
    const personId = req.params.id;

    Person.findOneAndDelete({ _id: personId })
        .then(() => {
            res.status(200).json({ message: 'Person deleted successfully' });
        })
        .catch(err => {
            res.status(500).json({ error: 'Database error' });
        });
});






app.use(express.static('public'));

app.listen(8080, () => {
    console.log('Server running on port 8080');
  });