'use strict'

var mongoose = require('mongoose'),
	schema = mongoose.Schema

var Instructor = new schema({
	fullName : {type: String, required: true},
	email: {type: String, required: true},
	rating: Number
})

// //allows deep population //see github docs for usage
// var deepPopulate = require('mongoose-deep-populate');
// Instructor.plugin(deepPopulate, {});

mongoose.model('Instructor', Instructor);