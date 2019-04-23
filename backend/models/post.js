// Load required packages
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId

// Define our user schema
var PostSchema = new mongoose.Schema({
    ship_id: Number,
    user_post: ObjectId,
    user_rating: Number,
    content: { type: String, default: ''}
},{ collection : 'posts' });

// Export the Mongoose model
module.exports = mongoose.model('Post', PostSchema);
