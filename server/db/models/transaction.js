var mongoose = require("mongoose");

var schema = new mongoose.Schema({
  user: {
    type: {
      mongoose.Schema.Types.ObjecId, ref: "User"
    },
    required: true
  },
  product: {
    type: {
      mongoose.Schema.Types.ObjectId, ref: "Product"
    },
    required: true
  },
  time: {
    type: Date,
    required: true
  }
})

mongoose.model("Transaction", schema);