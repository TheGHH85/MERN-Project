/**
 * Name: personRoutes.js
 * Type: Server side (Router)
 * Description: This is the router file for the person routes. It handles all the CRUD operations 
 *              in relation to employee (persons) data.
 * Programmer: Zac Bondy - c0870952
 */


/********************* IMPORTS ******************/
const express = require('express');
const router = express.Router();
const Person = require('../models/persons');

/********************* ROUTES ******************/

/**
 * Route: /persons (POST)
 * Description: This route is used to add a new person to the database.
 */
router.post('/persons', function (req, res) {
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

/**
 * Route: /persons
 * Description: This route is used to get all the persons from the database.
 */
router.get('/persons', function (req, res) {
    Person.find({})
        .then(persons => {
            res.status(200).json({ persons: persons || [] });
        })
        .catch(err => {
            res.status(500).json({ error: 'Database error' });
        });
});

/**
 * Route: /persons/:id (GET)
 * Description: This route is used to get a single person from the database.
 */
router.get('/update/:id', function (req, res) {
    const personId = req.params.id;

    Person.findById(personId)
        .then(person => {
            res.status(200).json({ person: person });
        })
        .catch(err => {
            res.status(500).json({ error: 'Database error' });
        });
});

/**
 * Route: /persons/:id (PUT)
 * Description: This route is used to update a single person in the database.
 */
router.put('/update/:id', function (req, res) {
    const personId = req.params.id;

    Person.findByIdAndUpdate(personId, req.body)
        .then(updatedPerson => {
            res.status(200).json({ message: 'Person updated successfully' });
        })
        .catch(err => {
            res.status(500).json({ error: 'Database error' });
        });
});

/**
 * Route: /persons/:id (POST)
 * Description: This route is used to delete a single person from the database.
 */
router.post('/delete/:id', function (req, res) {
    const personId = req.params.id;

    Person.findOneAndDelete({ _id: personId })
        .then(() => {
            res.status(200).json({ message: 'Person deleted successfully' });
        })
        .catch(err => {
            res.status(500).json({ error: 'Database error' });
        });
});


module.exports = router;