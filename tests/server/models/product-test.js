var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var Product = mongoose.model('Product');
var Instructor = mongoose.model('Instructor');

describe('Product model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Product).to.be.a('function');
    });


    describe('on creation', function () {
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

        it('should create a Product model in database', function(done){
            createInstructor().then(function(){
                Instructor.findOne({rating: 2}).exec()
                .then(function (ins){
                    createProduct(ins._id).then(function(){
                        Product.findOne({price: 50}).exec().then(function(prd){
                            expect(prd.title).to.be("JavaScript Tutoring");
                        })
                        done();
                    })
                    
                })
            })
        })

    });

});
