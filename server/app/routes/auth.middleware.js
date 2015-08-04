'use strict';

var User = require('../../db/models/user.js');

var Auth = {};

Auth.isAuthenticated = function (req, res, next) {
	if (req.user) next();
	else {
		throw "You have no power!";
		next()
	};
};

// Auth.isAdmin = function (req, res, next, err) {
// 	if (req.user && req.user.isAdmin) next();
// 	else{
// 		throw "You are too weak!";
// 		next();
// 	};
// }

module.exports = Auth;