/**
 * Name: users.js 
 * Type: Server side (Model)
 * Description: This is the model file for the users. It contains the schema for the users.
 * Programmer: Zac Bondy - c0870952
 */

const mongoose = require('mongoose');
 const user = new mongoose.Schema({
    email: String,
    password: String,
 });

    module.exports = mongoose.model('User', user);