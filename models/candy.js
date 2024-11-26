const mongoose = require('mongoose');

const candySchema = new mongoose.Schema({
  name: String,
  flavor: String,
  price: Number,
  stock: Number
});

module.exports = mongoose.model('Candy', candySchema);
