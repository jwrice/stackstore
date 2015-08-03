'user strict'

var mongoose = require("mongoose");

var transaction = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  time: {
    type: Date,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  rating: Number
});

//allows deep population //see github docs for usage
var deepPopulate = require('mongoose-deep-populate');
transaction.plugin(deepPopulate, {});

mongoose.model("Transaction", transaction);