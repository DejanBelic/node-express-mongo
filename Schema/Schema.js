const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

let Clicks = new Schema({
  clickTime:  { type : Date, default: Date.now }
});

module.exports = Clicks;