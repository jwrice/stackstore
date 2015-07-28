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

var instructorId = ''
var userEmail =''
var createUIP = function() {
	return User.create({
			email: 'trobama@gmail.com',
			password: 'apotus',
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
			return Instructor
			.populate(instructor, {
				path: 'user'
			})
		})
		.then(function(instructor){
			return Instructor
			.populate(instructor, {
				path: 'helpedStudents'
			})
		})
		// .then(function(instructor){
		// 	return Instructor
		// 	.populate(instructor, {
		// 		path: 'offeredProducts'
		// 	})
		// })
		.then(function(instructor){
			instructorId = instructor._id;
			//userEmail = instructor.user.email
			return Product.create({
				title: "Help",
				instructor: instructor._id
			})
		});	
};

xdescribe('Instructor Routes', function() {

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
				.then(function(res){
					done()
				})
		});

		it('should get with 200 response and with an array as the body', function(done) {
			guestAgent.get('/api/instructor/').expect(200).end(function(err, res) {
				if (err) return done(err);
				expect(res.body).to.be.an('array');
				done();
			});
		});

		it('should get and individual instructor given an id', function(done){
			guestAgent.get('/api/instructor/'+instructorId).expect(200).end(function(err,res){
				if (err) return done(err);
				expect(res.body._id).to.equal(instructorId.toString());
				//expect(res.body.useremail).to.be.equal.to(userEmail);
				done()
			})
		});


		it('should update an individual instructor given an id', function(done){
			guestAgent.put('/api/instructor/'+instructorId).send({rating: 2}).expect(200).end(function(err,res){
				if (err) return done(err);
				expect(res.body.rating).to.equal(2);
				//expect(res.body.useremail).to.be.equal.to(userEmail);
				done()
			})
		});

		it('should delete an individual instructor given an id', function(done){
			guestAgent.delete('/api/instructor/'+instructorId).expect(200).end(function(err,res){
					if (err) return done(err);
					expect(res.body._id).to.equal(instructorId.toString())
					done()
				})
			})

	});

});