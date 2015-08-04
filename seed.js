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
var categories = ["JavaScript", "Java", "Python", "C++", "Ruby", "Objective-C"];

function randUser(pds) {
  return User.create({
    lastName: chance.last(),
    firstName: chance.first(),
    email: emails.pop(),
    password: chance.word(),
    salt: User.generateSalt(),
    cart: [chance.pick(pds)._id],
    pastPurchases: [chance.pick(pds)._id]
  });
}


function randIns() {
  var rating = chance.natural({
    min: 1,
    max: 5
  })
  var num = chance.natural({
    min: 10,
    max: 50
  })
  return Instructor.create({
    fullName: chance.first() + ' ' + chance.last(),
    email: emails.pop(),
    rating: {
      numOfRat: num,
      ratingsAverage: rating
    },
    picture: randImg()
  })
}

function randTitle() {
  
  var choiceTitles = [
  'Get Angular Skills, Son!',
  'Dont Sweat SQL',
  '5 JS Libraries for Abstracting All Complexity Out of Your Entire Life',
  'Browsing Youtube for Dummies',
  'The Browser URL Bar: Challenges and Solutions',
  'Uncovering The Keyboard: How to Capitalize, Underline, and Bold Text',
  'Brackets and Parentheses: What are they, anyway?', '"Restart" Versus "Shutdown" - What You Dont Know Could Hurt You',
  'Is Your Computer Running Slowly? Welcome to MacKeeper 101',
  '']
  
  var titleIndex = Math.floor(Math.random() * (choiceTitles.length))

  return choiceTitles[titleIndex]

}

function randDescription() {

  var choiceDescriptions = ['Lorem ipsum dolor sit amet, error iusto quidam qui ex. No vis nostrum laboramus. Nibh eruditi maluisset eam ea, ea eos solum erant.',
  'ix invenire mnesarchum dissentiet, ea per verear oblique. Sea ad dicam invenire, purto omnes electram id sed, audiam saperet mentitum',
  'Sed dicat tation urbanitas ea, liber labitur cum in, ullum definiebas ad sed. Id amet exerci graeci mea, dicit dolor possit eos te.',
  'Cu tibique corpora scripserit pro, cu verterem imperdiet qui, sea dicunt tincidunt ne. Iisque feugait commune ex vis. Delenit debitis ius in',
  'Vix ut wisi causae laoreet, ex ius deleniti invidunt quaestio. Facilisis euripidis disputando no mei. Dicta salutatus cu nec. Usu ea latine euism',
  'utinam equidem accusamus ne duo, amet commodo disputationi est te. Honestatis scriptorem mel te, usu ex minim vocent om',
  'ius deleniti invidunt quaestio. Facilisis euripidis disputando no mei. Dicta salutatus cu nec. Usu ea latine euismod perpetua, nam meliore'
  ]
  
  var descriptionIndex = Math.floor(Math.random() * (choiceDescriptions.length))

  return choiceDescriptions[descriptionIndex]
  
}

function randProduct(allIns) {
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
    serviceDescription: randDescription(),
    price: price,
    timeAvailable: timeAvailable,
    instructor: instructor._id,
    categories: ["ALL", chance.pick(categories)]
  });
}

function randImg() {
  var randNum = Math.floor(Math.random() * 6);
  var picArr = ['zeke', 'scott', 'omri', 'joe', 'jimmy', 'gabe'];
  return picArr[randNum];
}

var existingIns = []

var seedInstructors = function() {
  var instructors = [];
  for (var i = 0; i < numIns; i++) {
    randIns().then(function(ins) {
      instructors.push(ins);
      existingIns = instructors;
    })
  };

  return Instructor.createAsync(instructors);

};

var existingPds = [];

var seedProducts = function() {
  var products = [];
  for (var i = 0; i < numProducts; i++) {
    randProduct(existingIns).then(function(prd) {
      products.push(prd);
      existingPds = products;
    })
  };

  return Product.createAsync(products);
}
var seedUsers = function() {
  var users = [];
  User.create({
    lastName: "Super",
    firstName: "User",
    email: 'superuser@gmail.com',
    password: '123',
    isAdmin: true,
    salt: User.generateSalt(),
    cart: [],
    pastPurchases: []
  }).then(function(user) {
    users.push(user);
  })
  for (var i = 0; i < numUsers; i++) {
    randUser(existingPds).then(function(user) {
      users.push(user);
    })
  };
  return User.createAsync(users);

};

connectToDb.then(function() {
  User.findAsync({}).then(function(users) {
    if (users.length === 0) {
      return seedInstructors();
    } else {
      console.log(chalk.magenta('Seems to already be instructor data, exiting!'));
      process.kill(0);
    }
  }).then(function() {
    return seedProducts();
  }).then(function() {
    return seedUsers();
  }).then(function() {
    console.log(chalk.green('Seed successful!'));
    process.kill(0);
  }).catch(function(err) {
    console.error(err);
    process.kill(1);
  });
});