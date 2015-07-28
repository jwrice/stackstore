// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var User = mongoose.model('User');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');
var User = mongoose.model('User');


describe('Users Route', function () {

	beforeEach('Establish DB connection', function (done) {
			if (mongoose.connection.db) return done();
			mongoose.connect(dbURI, done);
		});

	afterEach('Clear test database', function (done) {
		clearDB(done);
	});

	describe('Requests to /users', function () {

		var guestAgent;
		var userId;

		beforeEach('Create guest agent', function () {
			guestAgent = supertest.agent(app);
			return User.create({

				firstName: 'Gavin',
				lastName: 'X',
                email : 'user@gmail.com',
                password: '123',
                cart: [],
                salt: '123',
                pastPurchases: []
            })
            .then(function(user) {
            	userId = user._id;
            	return userId;
            })
		});

		it('should get the user info', function (done) {
			guestAgent.get('/api/users/'+userId)
				.expect(200)
				.end(function(err, res){
					if(err) return done(err);
					expect(res.body.lastName).to.equal('X');
					done();
				})
		});

		it('should create a new user', function(done){
			guestAgent.post('/api/users')
			.send({
				firstName: 'Xavier',
				lastName: 'Y',
                email : 'Xavier@gmail.com',
                password: '12345',
                cart: [],
                salt: '12312',
                pastPurchases: []
			}).end(function(err, res){
				// console.log(res.body);
				expect(res.body.firstName).to.equal("Xavier");
				done();
			})
		})

		it('should update a user', function(done){
			guestAgent.put('/api/users/' + userId)
			.send({
				firstName: 'UpdatedName',
			}).end(function(err, res){
				// console.log(res.body);
				expect(res.body.firstName).to.equal("UpdatedName");
				done();
			})
		})


	});


})