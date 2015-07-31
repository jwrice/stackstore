'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Cart = mongoose.model('Cart');
var Product = mongoose.model('Product');
var Instructor = mongoose.model('Instructor');


router.get("/:cartId", function(req, res, next) {
	//A single cart's page
	Cart.findById(req.params.cartId)
		.exec()
		.populate('cart')
		.then(function(cart) {
			if (!cart) throw "This cart does not exist";
			else {
				res.json(cart);
			}
		})
		.then(null, next);
})

//update the cart
router.put("/:cartId", function(req, res, next) {
	Instructor.findByIdAndUpdate(req.params.cartId, req.body, {"new":true})
		.then(function(cart) {
			res.json(cart);
		})
		.then(null, next);
})