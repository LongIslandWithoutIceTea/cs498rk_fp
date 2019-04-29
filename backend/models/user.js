// Load required packages
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId

// Define our user schema
var UserSchema = new mongoose.Schema({
    name: String,
    password: String,
    posts: { type: [ObjectId], default: []},
    account_id: { type: Number, default: 0}
},{ collection : 'users' });

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);
