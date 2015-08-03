'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
module.exports = router;
var _ = require('lodash');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Product = mongoose.model('Product');

router.param('userId', function(req, res, next, userId) {
	User.findById(userId).populate('cart', 'pastPurchases').exec()
		.then(function(user) {
			if (!user) throw new Error("user not found");
			req.currentUser = user;
			next();
		})
		.then(null, next);
})

router.get('/', function(req, res, next){
	User.find({})
	.deepPopulate('cart cart.product')
	.exec()
	.then(function(users){
		res.json(users);
		next();
	})
	.then(null, next);
})

// get all info (even transactions)
router.get('/:userId', function(req, res, next) {
	res.json(req.currentUser);
});

// adding/deleting products to the cart
// changing info on user account page
router.put('/:userId', function(req, res, next) {
	console.log('req.currentUser before update',req.currentUser)
	User.findByIdAndUpdate(req.currentUser._id, req.body, {'new': true})
	.deepPopulate('cart cart.product')
	.exec()
	.then(function(user) {
			if (!user) throw new Error("user not found");
			req.currentUser = user;
			console.log('req.currentUser after update', req.currentUser)
			res.json(req.currentUser);
			next();
		})
		.then(null, next);
});

// sign up
router.post('/', function(req, res, next) {
	var user = new User(req.body)
	user.salt = User.generateSalt()
	user.save()
		.then(function(user) {
			res.json(user);
		}, function(err) {
			next(err);
		})
});

//update the user
router.delete("/:userId", function(req, res, next) {
	User.findByIdAndRemove(req.params.userId).exec()
		.then(function(user) {
			res.status(200).send(user)
		})
		.then(null, next);
})