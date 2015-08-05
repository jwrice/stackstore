'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
module.exports = router;
var _ = require('lodash');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Product = mongoose.model('Product');
var Auth = require('../auth.middleware.js')

router.param('userId', function(req, res, next, userId) {
	User.findById(userId)
		.deepPopulate('pastPurchases pastPurchases.product pastPurchases.product.instructor cart cart.instructor')
		.exec()
		.then(function(user) {
			if (!user) throw new Error("user not found");
			req.currentUser = user;
			console.log(user)
			next();
		})
		.then(null, next);
})

router.get('/', function(req, res, next) {
	User.find({})
		.deepPopulate('cart cart.product')
		.exec()
		.then(function(users) {
			res.json(users);
			next();
		})
		.then(null, next);
})

// get all info (even transactions)
router.get('/:userId', function(req, res, next) {
	res.json(req.currentUser);
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



// Auth authentication here
// router.use('/:userId', Auth.isAuthenticated, function (req, res, next) {
// 	if (req.currentUser._id == req.user._id) next();
// 	else Auth.isAdmin(req, res, next);
// });
router.use('/:userId', Auth.isAuthenticated, function (req, res, next) {
	if (String(req.currentUser._id) === String(req.user._id)) {
		next()}
	else Auth.isAdmin(req, res, next);
});


// adding/deleting products to the cart
// changing info on user account page
router.put('/:userId', function(req, res, next) {
	console.log('req.currentUser before update', req.currentUser)
	User.findByIdAndUpdate(req.currentUser._id, req.body, {
			'new': true
		})
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

//update the user
router.delete("/:userId", function(req, res, next) {
	User.findByIdAndRemove(req.params.userId).exec()
		.then(function(user) {
			res.status(200).send(user)
		})
		.then(null, next);
})