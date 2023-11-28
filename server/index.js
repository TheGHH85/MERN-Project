var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://greyhathacker:Bandacoot85@cluster0.4ctydej.mongodb.net/?retryWrites=true&w=majority');

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.use(cors());
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


var Person = mongoose.model("Person", personSchema);
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

app.post('/login', function (req, res) {
    const { email, password } = req.body;


    Login.findOne({ email: email, password: password })
        .then(user => {
            if (user) {
                res.status(200).json({ message: 'Login successful' });
            } else {
                res.status(401).json({ error: 'Invalid email or password' });
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'Database error' });
        });
});




app.use(express.static('public'));

app.listen(8080);