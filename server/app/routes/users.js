'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var User = mongoose.model('User');

router.param('userId', function(req,res,next,userId) {
	User.findById(userId).exec()
	.then(function(user) {
		req.user = user;
		next();
	}, function(err) {
		next(err);
	})
})


// get all info (even transactions)

router.get('/:userId', function (req, res, next) {
	res.json(req.user);
});



// adding/deleting products to the cart
// changing info on user account page

router.put('/:userId', function (req, res, next) {
	req.user = req.body;
	req.user.save();
	res.json(req.user);
});



// sign up

router.post('/', function (req, res, next) {
	User.create(req.body)
	.then(function(user) {
		res.json(user);
	}, function(err) {
		next(err);
	})
});