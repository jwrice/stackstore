'use strict'

var mongoose = require('mongoose'),
	schema = mongoose.Schema

var Instructor = new schema({
	user: {
		type: schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	rating: Number,
	helpedStudents: [{
		type: schema.Types.ObjectId,
		ref: 'User'
	}],
	offeredProducts: [{
		type: schema.Types.ObjectId,
		ref: 'Product'
	}]
})

mongoose.model('Instructor', Instructor);