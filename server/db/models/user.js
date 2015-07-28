'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var Product = require('./product.js');
var Transaction = require('./transaction.js');

var schema = new mongoose.Schema({
     lastName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    cart: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }]
        // required: true
    },
    pastPurchases: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Transaction"
        }]
        // required: true
    },
    twitter: {
        id: String,
        username: String,
        token: String,
        tokenSecret: String
    },
    facebook: {
        id: String
    },
    google: {
        id: String
    }
});

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.
var generateSalt = function() {
  return crypto.randomBytes(16).toString('base64');
};

var encryptPassword = function(plainText, salt) {
  var hash = crypto.createHash('sha1');
  hash.update(plainText);
  hash.update(salt);
  return hash.digest('hex');
};

schema.pre('save', function(next) {

  if (this.isModified('password')) {
    this.salt = this.constructor.generateSalt();
    this.password = this.constructor.encryptPassword(this.password, this.salt);
  }

  next();

});

schema.statics.generateSalt = generateSalt;
schema.statics.encryptPassword = encryptPassword;

schema.method('correctPassword', function(candidatePassword) {
  return encryptPassword(candidatePassword, this.salt) === this.password;
});

mongoose.model('User', schema);