var mongoose = require('mongoose');

var ServantSchema = new mongoose.Schema({
  id: Number,
  name: String,
  stars: Number
  icon: String
},{ collection: 'servants'});

module.exports = mongoose.model('Servant', ServantSchema);
