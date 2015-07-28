'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
module.exports = router;
var _ = require('lodash');
var User = mongoose.model('User');

router.param('userId', function(req, res, next, userId) {
	User.findById(userId).populate('cart').populate('pastPurchases').exec()
		.then(function(user) {
			if (!user) throw new Error("user not found");
			req.currentUser = user;
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
	console.log('req.body', req.body)
	// User.update({_id: req.currentUser._id}, {$set: req.body})
	// .then(function(user){
	// 	console.log(user);
	// 	res.json(user);
	// })
	User.findByIdAndUpdate(req.currentUser._id, req.body, {'new': true})
	.then(function(user) {
		console.log('user', user)
			if (!user) throw new Error("user not found");
			req.currentUser = user;
			res.json(user);
			next();
		})
		.then(null, next);
	// req.currentUser = req.body;
	// req.currentUser.save();
	// // console.log('req.currentUser', req.currentUser)
	// res.json(req.currentUser);
});

// sign up
router.post('/', function(req, res, next) {
	User.create(req.body)
		.then(function(user) {
			res.json(user);
		}, function(err) {
			next(err);
		})
});
