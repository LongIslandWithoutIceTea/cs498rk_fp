// Load required packages
var mongoose = require('mongoose');

// Define our user schema
var UserSchema = new mongoose.Schema({
    name: String,
    password: String,
    favorite: [Number]
},{ collection : 'users' });

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);
