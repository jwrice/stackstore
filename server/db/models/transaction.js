'user strict'

var mongoose = require("mongoose");

var transaction = new mongoose.Schema({
  user: {
<<<<<<< HEAD
    type: mongoose.Schema.Types.ObjectId,
=======
    type: mongoose.Schema.Types.ObjectId, 
>>>>>>> master
    ref: "User",
    required: true
  },
  product: {
<<<<<<< HEAD
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Instructor",
=======
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Product",
>>>>>>> master
    required: true
  },
  time: {
    type: Date,
    required: true
  }
});

mongoose.model("Transaction", transaction);