'use strict'

var mongoose = require('mongoose'),
	schema = mongoose.Schema

var Instructor = new schema({
	user: {
		type: schema.Types.ObjectId,
		ref: 'User',
		required: false	},
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

//allows deep population //see github docs for usage
var deepPopulate = require('mongoose-deep-populate');
Instructor.plugin(deepPopulate, {});

mongoose.model('Instructor', Instructor);