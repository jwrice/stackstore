// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var User = mongoose.model('User'),
	Product = mongoose.model('Product'),
	Instructor = mongoose.model('Instructor');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

var createUIP = function() {
	return User.create({
			email: 'obama@gmail.com',
			password: 'potus',
			salt: "whatever",
			// cart: [],
			// pastPurchases: [],
			isInstructor: false
		})
		.then(function(user) {
			return Instructor.create({
				user: user._id,
				rating: 4,
			})
		})
		.then(function(instructor) {
			return Product.create({
				title: "Help",
				instructor: instructor._id
			})
		})
		.then(function(product) {
			return User.findByIdAndUpdate(testId, {
				cart: [product._id]
			}).populate('cart')
		});
};

xdescribe('Instructor Routes', function() {

	beforeEach('Establish DB connection', function(done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
		createUIP()
	});

	afterEach('Clear test database', function(done) {
		clearDB(done);
	});

	describe('Basic routing', function() {

		beforeEach('Create loggedIn user agent and authenticate', function(done) {
			guestAgent = supertest.agent(app);
		});

		it('should get with 200 response and with an array as the body', function(done) {
			loggedInAgent.get('/api/members/secret-stash').expect(200).end(function(err, response) {
				if (err) return done(err);
				expect(response.body).to.be.an('array');
				done();
			});
		});

		it('should get with 200 response and with an array as the body', function(done) {
			guestAgent.get('/instructors/').expect(200).end(function(err, response) {
				if (err) return done(err);
				expect(response.body).to.be.an('array');
				done();
			});
		});

	});

});