'use strict'

var mongoose = require('mongoose'),
  schema = mongoose.Schema

var Instructor = new schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  rating: {
    numOfRat: Number,
    ratingsAverage: Number
  },
  picture: String
})


Instructor.methods.makeAverage = function(number) {
  this.rating.ratingsAverage = (this.rating.numOfRat * this.rating.ratingsAverage + number) / (++this.rating.numOfRat);
  return this.save();
}

mongoose.model('Instructor', Instructor);