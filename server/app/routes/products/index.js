'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Product = mongoose.model('Product');

router.get('/', function(req, res, next) {
	Product.find({})
		.populate('instructor')
		.exec()
		.then(function(products) {
			if (!products) throw "Error retrieving products";
			else {
				res.json(products);
			}
		})
		.then(null, next);
})

//add new product
router.post("/:instructorId", function(req, res, next) {
	req.body.instructor = req.params.instructorId;
	console.log("hit here", req.body);
	Product.create(req.body)
		.then(function(product) {
			Product.populate(product, {
				path: 'instructor'
			})
			res.json(product);
		})
		.then(null, next);
})

router.get('/:productId', function(req, res, next) {
	Product.findById(req.params.productId)
		.populate('instructor')
		.exec()
		.then(function(product) {
			if (!product) throw "Product not found";
			else {
				res.json(product);
			}
		})
		.then(null, next);
})

//update a product
router.put("/:productId", function(req, res, next) {
	Product.findByIdAndUpdate(req.params.productId, req.body,{'new': true}).exec()
		.then(function(product) {
			res.json(product);
			next();
		})
		.then(null, next);
})

//delete a product
router.delete("/:productId", function(req, res, next) {
	Product.findById(req.params.productId).exec()
		.then(function(product) {
			product.remove();
			res.json({message: "deleted"});
		})
		.then(null, next);
})