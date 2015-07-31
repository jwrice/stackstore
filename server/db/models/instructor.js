'use strict'

var mongoose = require('mongoose'),
    schema = mongoose.Schema

var Instructor = new schema({
    fullName : {type: String, required: true},
    email: {type: String, required: true},
    rating: {
        numOfRat: Number,
        ratingsAverage: Number
    }
})


Instructor.methods.makeAverage = function (number) {
    this.ratingsAverage = (this.numOfRat*this.ratingsAverage + number)/(this.numOfRat + 1)
    this.numOfRat++;
}

mongoose.model('Instructor', Instructor);