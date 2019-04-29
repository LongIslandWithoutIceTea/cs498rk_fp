// Load required packages
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId

// Define our user schema
var PostSchema = new mongoose.Schema({
    ship_id: Number,
    user_post: String,
    user_rating: Number,
    date_created: {type:Date, default: Date.now},
    content: {type: String, default: ''},
},{ collection : 'posts' });

// Export the Mongoose model
module.exports = mongoose.model('Post', PostSchema);
