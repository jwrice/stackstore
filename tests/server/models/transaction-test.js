var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var Product = mongoose.model('Product');
var Instructor = mongoose.model('Instructor');
var Transaction = mongoose.model('Transaction');
var User = mongoose.model('User');

describe('Transaction model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Transaction).to.be.a('function');
    });


    describe('on creation', function () {
        var createUser = function (){
            return User.create({
                email : 'obama@gmail.com',
                password: '123',
                cart: [],
                pastPurchases: []
        });
        }

        var createTransaction = function (userId, prdId){
            return Transaction.create({
                user: userId,
                product: prdId,
                time: new Date()
            });
        }

        var createInstructor = function (){
            return Instructor.create({rating: 2});
        }

        var createProduct = function (id) {
            return Product.create({ title: "JavaScript Tutoring", serviceDescription: "I will teach you JavaScript",
            price: 50, timeAvailable: {
                date: "July 4th",
                startTime: "1am",
                duration: 1
            },
            categories: ['code','JavaScript','programming'],
            instructor: id
             });
        };

        it('should create a Transaction model in database', function(done){
            console.log("start");
            var userId;
            createUser()
            .then(function(user) {
                userId = user._id;
                console.log('user',user)
                return userId;
            })
            .then(function () {
                console.log('instructor');
                return createInstructor()
            })
            .then(function (instructor) {
                console.log("instructor created", instructor)
                return createProduct(instructor._id)
            })
            .then(function(product) {
                console.log('product', product);
                return createTransaction(userId, product._id)
            })
            .then(function(transaction) {
                console.log("transaction",transaction)
                done();
            })

        })

    });

});