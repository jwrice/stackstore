'use strict'

var mongoose = require('mongoose');

var Product = new mongoose.Schema({
	title: String,
	serviceDescription: String,
	price: Number,
	timeAvailable: {
		date: String,
		startTime: String,
		duration: Number
	},
	categories: [String],
	instructor: {
		type: String,
		ref: 'Instructor',
		required: true
	}
})

mongoose.model('Product', Product);