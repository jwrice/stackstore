// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var User = mongoose.model('User');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');
var Product = mongoose.model('Product');
var Instructor = mongoose.model('Instructor');


describe('Products Route', function () {

	beforeEach('Establish DB connection', function (done) {
			if (mongoose.connection.db) return done();
			mongoose.connect(dbURI, done);
		});

	afterEach('Clear test database', function (done) {
		clearDB(done);
	});

	describe('Requests to /products', function () {

		var guestAgent;
		var ins_id;
		var prd_id;

		beforeEach('Create guest agent', function () {
			guestAgent = supertest.agent(app);
			Instructor.create({
				rating:2
			}).then(function(data){
				ins_id = data._id;
			})
			return Product.create({
				title: "JavaScript tutoring",
				serviceDescription: "I am a good tutor and I will make you a good student",
				price: 10000,
				timeAvailable: {
					date: "Today",
					startTime: "now",
					duration: 10
				},
				categories: ["God"]
			}).then(function(data){
				prd_id = data._id;
				return data;
			})
		});

		it("should return all products", function(done){
			guestAgent.get('/api/products/')
			.end(function(err, res){
				if(err) return done(err);
				expect(res.body[0].price).to.equal(10000);
				done();
			})
		})

		it('should add new product', function(done){
			guestAgent.post('/api/products/'+ins_id)
			.send({
				title: 'Python tutoring',
				serviceDescription: "I am a better tutor and I will make you a better student",
				price: 10001,
				timeAvailable: {
					date: 'Tomorrow',
					startTime: "next moment",
					duration: 11
				},
				categories: ["Deity"]
			}).end(function(err, res){
				if(err) return done(err);
				expect(res.body.price).to.equal(10001);
				done();
			})
		})

		it("should find a single product", function(done){
			guestAgent.get('/api/products/'+prd_id)
			.end(function(err, res){
				if(err) return done(err);
				expect(res.body.title).to.equal("JavaScript tutoring");
				done();
			})
		})

		it("should update a product", function(done){
			guestAgent.put('/api/products/'+prd_id)
			.send({
				price: 1
			}).end(function(err, res){
				if(err) return done(err);
				expect(res.body.price).to.equal(1);
				done();
			})
		})

		it('should delete a product', function(done){
			guestAgent.delete('/api/products/'+prd_id)
			.end(function(err, res){
				if(err) return done(err);
				expect(res.body.message).to.equal("deleted");
				done();
			})
		})
	});


})