'use strict'

var mongoose = require('mongoose');


var Cart = new mongoose.Schema({
  cart: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    }]
  },
})

mongoose.model('Cart', Cart);