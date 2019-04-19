var mongoose = require('mongoose');

var ServantInfoSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  stars: Number,
  class: String,
  japanese_name: String,
  aka: String,
  cost: Number,
  atk: String,
  hp: String,
  grail_atk: String,
  grail_hp: Sting,
  voice_actor: Sting,
  illustrator: Sting,
  attribute: Sting,
  growth_curve: Sting,
  star_absorption: String,
  star_generation: Sting,
  np_charge_atk: Sting,
  np_charge_def: Sting,
  death_rate: Sting,
  alignments: Sting,
  gender: Sting,
  traits: Sting,
  qab: Sting,
  saint_graphs: []
  icons: []
  sprites: []
},{ collection: 'servants_info'});

module.exports = mongoose.model('Servant', ServantInfoSchema);
