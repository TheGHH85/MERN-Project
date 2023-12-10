/**
 * Name: persons.js
 * Type: Server side (Model)
 * Description: This is the model file for the persons. It contains the schema for the persons.
 * Programmer: Zac Bondy - c0870952
 */

const mongoose = require('mongoose');


const personSchema = mongoose.Schema({
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

module.exports = mongoose.model('Person', personSchema);