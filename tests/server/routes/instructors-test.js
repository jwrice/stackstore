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

var instructorId = '';
var createUIP = function() {
	return Instructor.create({
			fullName: "Barack Obama",
			email: 'trobama@gmail.com',
			rating:4
		})
		.then(function(instructor) {
			instructorId = instructor._id;
			return Product.create({
				title: "Help",
				instructor: instructor._id
			})
		})
		.then(null, function(err) {
			console.log(err);
		});
};

describe('Instructor Routes', function() {

	beforeEach('Establish DB connection', function(done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done)
	});

	afterEach('Clear test database', function(done) {
		clearDB(done);
	});

	describe('Basic routing', function() {

		beforeEach('Create loggedIn user agent and authenticate', function(done) {
			guestAgent = supertest.agent(app);
			createUIP()
				.then(function(product) {
					done()
				})
		});

		it('should get with 200 response and with an array as the body', function(done) {
			guestAgent.get('/api/instructor/').expect(200).end(function(err, res) {
				if (err) return done(err);
				Instructor.findById(instructorId).exec()
				.then(function(instructor){
					expect(res.body.indexOf(instructor)).to.not.equal(-1);
					done();
				})
			});
		});

		it('should get and individual instructor given an id', function(done) {
			guestAgent.get('/api/instructor/' + instructorId).expect(200).end(function(err, res) {
				if (err) return done(err);
				expect(res.body._id).to.equal(instructorId.toString());
				//expect(res.body.useremail).to.be.equal.to(userEmail);
				done()
			})
		});

		it('should update an individual instructor given an id', function(done) {
			guestAgent.put('/api/instructor/' + instructorId).send({
				rating: 2
			}).expect(200).end(function(err, res) {
				if (err) return done(err);
				expect(res.body.rating).to.equal(2);
				//expect(res.body.useremail).to.be.equal.to(userEmail);
				done()
			})
		});

		it('should delete an individual instructor given an id', function(done) {
			guestAgent.delete('/api/instructor/' + instructorId).expect(200).end(function(err, res) {
				if (err) return done(err);
				expect(res.body._id).to.equal(instructorId.toString())
				done()
			})
		})

	});

});