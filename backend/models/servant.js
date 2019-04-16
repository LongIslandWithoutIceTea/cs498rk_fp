// Load required packages
var mongoose = require('mongoose');

// Define our user schema
var ServantSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    star: Number
},{ collection : 'servants' });

// Export the Mongoose model
module.exports = mongoose.model('Servant', ServantSchema);
