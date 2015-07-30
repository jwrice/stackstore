/*
This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.
It uses the same file the server uses to establish
the database connection:
--- server/db/index.js
The name of the database used is set in your environment files:
--- server/env/*
This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.
*/

var chance = require('chance')(123),
    _ = require('lodash');
var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var User = Promise.promisifyAll(mongoose.model('User'));
var Instructor = Promise.promisifyAll(mongoose.model('Instructor'));
var Product = Promise.promisifyAll(mongoose.model('Product'));

var numUsers = 10;
var numIns = 10;
var numProducts = 20;
var emails = chance.unique(chance.email, 100);
var categories = ["JavaScript","Java","Python","C++","Ruby","Objective-C"];

function randUser () {
    return User.create({
        lastName: chance.last(),
        firstName: chance.first(),
        email: emails.pop(),
        password: chance.word(),
        salt: User.generateSalt(),
        cart: [],
        pastPurchases: []
    });
}


function randIns () {
    var rating = chance.natural({
        min:1,
        max:5
    })
    return Instructor.create({
        fullName: chance.first() + chance.last(),
        email: emails.pop(),
        rating: rating,
    })
}

function randTitle () {
    var numWords = chance.natural({
        min: 1,
        max: 8
    });
    return chance.sentence({words: numWords})
    .replace(/\b\w/g, function (m) {
        return m.toUpperCase();
    })
    .slice(0, -1);
}

function randProduct (allIns) {
    var instructor = chance.pick(allIns);
    var price = chance.natural({
        min: 1000,
        max: 5000
    });
    var timeAvailable = chance.natural({
        min: 30,
        max: 120
    })
    return Product.create({
        title: randTitle(),
        serviceDescription: randTitle(),
        price: price,
        timeAvailable: timeAvailable,
        instructor: instructor._id,
        categories: ["ALL",chance.pick(categories)]
    });
}

var seedUsers = function () {
    var users = [];
    for (var i = 0; i < numUsers; i++) {
        randUser().then(function(user){
            users.push(user);
        })
    };
    return User.createAsync(users);

};



var existingIns = []

var seedInstructors = function () {
    var instructors = [];
    for (var i = 0; i < numIns; i++) {
        randIns().then(function(ins){
            instructors.push(ins);
            existingIns = instructors;
        })
    };

    return Instructor.createAsync(instructors);

};

var seedProducts = function () {
    var products = [];
    for (var i = 0; i < numProducts; i++) {
        randProduct(existingIns).then(function(prd){
            products.push(prd);
        })
    };

    return Product.createAsync(products);
}

connectToDb.then(function () {
    User.findAsync({}).then(function (users) {
        if (users.length === 0) {
            return seedUsers();
        } else {
            console.log(chalk.magenta('Seems to already be user data, exiting!'));
            process.kill(0);
        }
    }).then(function() {
        return seedInstructors();
    }).then(function() {
        return seedProducts();
    }).then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});