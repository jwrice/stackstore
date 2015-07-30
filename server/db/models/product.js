'use strict'

var mongoose = require('mongoose');

var Product = new mongoose.Schema({
	title: String,
	serviceDescription: String,
	price: Number,
	timeAvailable: Number,
	categories: [String],
	instructor: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Instructor',
		required: true
	}
})

// //allows deep population //see github docs for usage
// var deepPopulate = require('mongoose-deep-populate');
// Product.plugin(deepPopulate, {});

mongoose.model('Product', Product);