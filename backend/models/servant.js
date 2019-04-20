var mongoose = require('mongoose');

var ServantInfoSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  stars: Number,
  class: String,
  japanese_name: String,
  aka: String,
  cost: String,
  atk: String,
  hp: String,
  grail_atk: String,
  grail_hp: String,
  voice_actor: String,
  illustrator: String,
  attribute: String,
  growth_curve: String,
  star_absorption: String,
  star_generation: String,
  np_charge_atk: String,
  np_charge_def: String,
  death_rate: String,
  alignments: String,
  gender: String,
  traits: String,
  qab: String,
  saint_graphs: Array,
  icons: Array,
  sprites: Array,
},{ collection: 'servants'});

module.exports = mongoose.model('Servant', ServantInfoSchema);
