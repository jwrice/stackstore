// // Instantiate all models
// var mongoose = require('mongoose');
// require('../../../server/db/models');
// var User = mongoose.model('User');

// var expect = require('chai').expect;

// var dbURI = 'mongodb://localhost:27017/testingDB';
// var clearDB = require('mocha-mongoose')(dbURI);

// var supertest = require('supertest');
// var app = require('../../../server/app');
// var User = mongoose.model('User');


// describe('Users Route', function () {

// 	beforeEach('Establish DB connection', function (done) {
// 		if (mongoose.connection.db) return done();
// 		mongoose.connect(dbURI, done);
// 	});

// 	afterEach('Clear test database', function (done) {
// 		clearDB(done);
// 	});

// 	// describe('Unauthenticated request', function () {

// 	// 	var guestAgent;

// 	// 	beforeEach('Create guest agent', function () {
// 	// 		guestAgent = supertest.agent(app);
// 	// 	});

// 	// 	it('should get a 401 response', function (done) {
// 	// 		guestAgent.get('/api/members/secret-stash')
// 	// 			.expect(401)
// 	// 			.end(done);
// 	// 	});


// // OUR CODE 

// 		describe('Requests to /users', function () {

// 		var guestAgent;

// 		beforeEach('Create guest agent', function () {
// 			guestAgent = supertest.agent(app);
// 			var userId;
// 			return User.create({
// 				firstName: 'Gavin',
// 				lastName: 'X',
//                 email : 'user@gmail.com',
//                 password: '123',
//                 cart: [],
//                 salt: '123',
//                 pastPurchases: []
//             })
//             .then(function(user) {
//             	userId = user._id;
//             	return userId;
//             })
// 		});

// 		it('should get a 200 response', function (done) {
// 			guestAgent.get('/users/userId')
// 				.expect(200)
// 				.expect(response.body.firstName).to.be('Gavin')
// 				.end(done);
// 		});

// 	});

// 	describe('Authenticated request', function () {

// 		var loggedInAgent;

// 		var userInfo = {
// 			email: 'joe@gmail.com',
// 			password: 'shoopdawoop'
// 		};

// 		beforeEach('Create a user', function (done) {
// 			User.create(userInfo, done);
// 		});

// 		beforeEach('Create loggedIn user agent and authenticate', function (done) {
// 			loggedInAgent = supertest.agent(app);
// 			loggedInAgent.post('/login').send(userInfo).end(done);
// 		});

// 		it('should get with 200 response and with an array as the body', function (done) {
// 			loggedInAgent.get('/api/members/secret-stash').expect(200).end(function (err, response) {
// 				if (err) return done(err);
// 				expect(response.body).to.be.an('array');
// 				done();
// 			});
// 		});

// 	});

// });
