'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var instructor = mongoose.model('Instructor');
var product = mongoose.model('Product');

router.get('/', function (req, res, next){
	product.find({})
	.populate('instructor')
	.exec()
	.then(function (products){
		if(!products) throw "Error retrieving products";
		else{
			res.json(products);
		}
	})
	.then(null, next);
})

router.get('/:productId', function (req, res, next){
	product.findOne({_id: req.params.productId})
	.populate('instructor')
	.exec()
	.then(function (prdt){
		if(!prdt) throw "Product not found";
		else{
			res.json(prdt);
		}
	})
	.then(null, next);
})

