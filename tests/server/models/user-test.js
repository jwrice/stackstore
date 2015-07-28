// var dbURI = 'mongodb://localhost:27017/testingDB';
// var clearDB = require('mocha-mongoose')(dbURI);

// var sinon = require('sinon');
// var expect = require('chai').expect;
// var mongoose = require('mongoose');

// // Require in all models.
// require('../../../server/db/models');

var User = mongoose.model('User'),
    Product = mongoose.model('Product'),
    Instructor = mongoose.model('Instructor')

// describe('User model', function () {

//     beforeEach('Establish DB connection', function (done) {
//         if (mongoose.connection.db) return done();
//         mongoose.connect(dbURI, done);
//     });

//     afterEach('Clear test database', function (done) {
//         clearDB(done);
//     });

//     it('should exist', function () {
//         expect(User).to.be.a('function');
//     });

//     describe('password encryption', function () {

//         describe('generateSalt method', function () {

//             it('should exist', function () {
//                 expect(User.generateSalt).to.be.a('function');
//             });

//             it('should return a random string basically', function () {
//                 expect(User.generateSalt()).to.be.a('string');
//             });

//         });

//         describe('encryptPassword', function () {

//             var cryptoStub;
//             var hashUpdateSpy;
//             var hashDigestStub;
//             beforeEach(function () {

//                 cryptoStub = sinon.stub(require('crypto'), 'createHash');

//                 hashUpdateSpy = sinon.spy();
//                 hashDigestStub = sinon.stub();

//                 cryptoStub.returns({
//                     update: hashUpdateSpy,
//                     digest: hashDigestStub
//                 });

//             });

//             afterEach(function () {
//                 cryptoStub.restore();
//             });

//             it('should exist', function () {
//                 expect(User.encryptPassword).to.be.a('function');
//             });

//             it('should call crypto.createHash with "sha1"', function () {
//                 User.encryptPassword('asldkjf', 'asd08uf2j');
//                 expect(cryptoStub.calledWith('sha1')).to.be.ok;
//             });

//             it('should call hash.update with the first and second argument', function () {

//                 var pass = 'testing';
//                 var salt = '1093jf10j23ej===12j';

//                 User.encryptPassword(pass, salt);

//                 expect(hashUpdateSpy.getCall(0).args[0]).to.be.equal(pass);
//                 expect(hashUpdateSpy.getCall(1).args[0]).to.be.equal(salt);

//             });

//             it('should call hash.digest with hex and return the result', function () {

//                 var x = {};
//                 hashDigestStub.returns(x);

//                 var e = User.encryptPassword('sdlkfj', 'asldkjflksf');

//                 expect(hashDigestStub.calledWith('hex')).to.be.ok;
//                 expect(e).to.be.equal(x);

//             });

//         });

//         describe('on creation', function () {

//             var encryptSpy;
//             var saltSpy;

<<<<<<< HEAD
//             var createUser = function () {
//                 return User.create({ email: 'obama@gmail.com', password: 'potus' });
//             };
=======
            var createUser = function () {
                return User.create({
                    email: 'obama@gmail.com',
                    password: 'potus',
                    salt: "whatever",
                    // cart: [],
                    // pastPurchases: [],
                    isInstructor: false
                });
            };
>>>>>>> master

//             beforeEach(function () {
//                 encryptSpy = sinon.spy(User, 'encryptPassword');
//                 saltSpy = sinon.spy(User, 'generateSalt');
//             });

//             afterEach(function () {
//                 encryptSpy.restore();
//                 saltSpy.restore();
//             });

<<<<<<< HEAD
//             it('should call User.encryptPassword with the given password and generated salt', function (done) {
//                 createUser().then(function () {
//                     var generatedSalt = saltSpy.getCall(0).returnValue;
//                     expect(encryptSpy.calledWith('potus', generatedSalt)).to.be.ok;
//                     done();
//                 });
//             });
=======
            it('should call User.encryptPassword with the given password and generated salt', function (done) {
                createUser()
                .then(function () {
                    var generatedSalt = saltSpy.getCall(0).returnValue;
                    expect(encryptSpy.calledWith('potus', generatedSalt)).to.be.ok;
                    done();
                })
                .then(function(result){
                    console.log(result)
                }, function(err){
                    console.log(err)
                })
            });
>>>>>>> master

//             it('should set user.salt to the generated salt', function (done) {
//                createUser().then(function (user) {
//                    var generatedSalt = saltSpy.getCall(0).returnValue;
//                    expect(user.salt).to.be.equal(generatedSalt);
//                    done();
//                });
//             });

//             it('should set user.password to the encrypted password', function (done) {
//                 createUser().then(function (user) {
//                     var createdPassword = encryptSpy.getCall(0).returnValue;
//                     expect(user.password).to.be.equal(createdPassword);
//                     done();
//                 });
//             });

//         });

//     });

<<<<<<< HEAD
// });
=======
    describe('basic routing', function () {

        var createUser = function () {
            return User.create({
                email: 'obama@gmail.com',
                password: 'potus',
                salt: "whatever",
                // cart: [],
                // pastPurchases: [],
                isInstructor: false
            });
        };

        describe('should get', function () {

            beforeEach(function (done) {
                createUser()
                .then(function(result){
                    testId = result._id
                    done()
                }, done);
            });

            afterEach('Clear test database', function (done) {
                clearDB(done);
            });   

            it('should return the existing users', function(done){
                User.find({}).exec()
                .then(function(users){
                    expect(users.length).to.be.equal(1);
                    done();
                })
                .then(null, function(err){
                    done()
                })
            })

            it('should return a user by ID', function(done){
                User.findById(testId)
                .exec()
                .then(function(user){
                    expect(user.email).to.be.equal("obama@gmail.com");
                    done()
                })
                .then(null, function(err){
                    done()
                })
            })

            it('should update a user with a new email address', function(done){
                User.update({
                    email: 'michelle@gmail.com',
                    password: 'flotus',
                    salt: "whatever",
                    // cart: [],
                    // pastPurchases: [],
                    isInstructor: true
                })
                .exec()
                .then(function(user){
                    expect(user.email).to.be.equal("michelle@gmail.com");
                    // expect(user.isInstructor).to.be.equal(false);
                    done()
                })
                .then(null, function(err){
                    done()
                })
            })

            it('should update a user with a new product reference within the cart', function(done){
                User.create({
                    email: 'biden@gmail.com',
                    password: 'viceprez',
                    salt: "whatever",
                    // cart: [],
                    // pastPurchases: [],
                    isInstructor: true
                }).then(function(user){
                    return Instructor.create({
                        user: user._id,
                        rating: 4,
                    })
                }).then(function(instructor){
                    return Product.create({
                        title: "Help",
                        instructor: instructor._id
                    })
                }).then(function(product){
                    return User.findByIdAndUpdate(testId, {
                            cart: [product._id]
                        }).populate('cart')
                })
                .then(function(user){
                    expect(user.cart.length).to.be.equal(1);
                    expect(user.cart[0].title).to.be.equal("Help");
                    expect(user.cart[0].instructor).to.be.an(objId);
                    // expect(user.isInstructor).to.be.equal(false);
                    done()
                })
                .then(null, function(err){
                    done()
                })
            })

        })

    })
});
>>>>>>> master
