// Load required packages
var mongoose = require('mongoose');

// Define our user schema
var ServantSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    star: Number,
    Japanese Name: String,
    AKA: String,
    Cost: String,
    ATK: String,
    HP: String,
    Grail ATK: String,
    Grail HP: String,
    Voice Actor: String,
    Illustrator: String,
    Attribute: String,
    Growth Curve: String,
    Star Absorption: String,
    NP Charge ATK: String,
    NP Charge DEF: String,
    Death Rate: String,
    Alignments: String,
    Gender: String,
    Saint Graphs: Array,
    Icons: Array,
    Sprites: Array

},{ collection : 'servants' });

// Export the Mongoose model
module.exports = mongoose.model('Servant', ServantSchema);
