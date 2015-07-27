'use strict'

var mongoose = require('mongoose');

var Instructor = new mongoose.Schema({
	user: {
		type: ObjectId,
		ref: 'User'
		required: true
	},
	rating: Number,
	helpedStudents: [{
		type: String,
		ref: 'User'
	}],
	offeredProducts: [{
		type: String,
		ref: 'Product'
	}]
})

mongoose.model('Instructor', Instructor);