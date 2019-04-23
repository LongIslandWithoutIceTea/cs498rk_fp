// Load required packages
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId

// Define our user schema
var UserSchema = new mongoose.Schema({
    name: String,
    password: String,
    icon: { data: Buffer, contentType: String},
    posts: { type: [ObjectId], default: []}
},{ collection : 'users' });

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);
