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

'use strict';

var chance = require('chance')(123),
    _ = require('lodash'),
    Promise = require('bluebird');

var db = require('./server/db');
var Story = require('./server/api/stories/story.model');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var numUsers = 10;
var numProducts = 20;

var emails = chance.unique(chance.email, numUsers);

function randUser () {
    return User.create({
        lastName: chance.last(),
        firstName: chance.first(),
        email: emails.pop(),
        password: chance.word(),
        cart: [randProduct()],
        pastPurchases: [randProduct()]
    });
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

// function randProduct (allUsers) {
//     var user = chance.pick(allUsers);
//     var price = chance.natural({
//         min: 15,
//         max: 50
//     });
//     return Product.create({
//         title: randTitle(),
//         serviceDescription: randTitle(),
//         price: price,
//         instructor: 
//     });
// }

function generateAll () {
    var users = _.times(numUsers, randUser);
    var stories = _.times(numStories, function () {
        return randStory(users);
    });
    return users.concat(stories);
}

function seed () {
    var docs = generateAll();
    return Promise.map(docs, function (doc) {
        return doc.save();
    });
}

db.drop = Promise.promisify(db.db.dropDatabase.bind(db.db));

db.on('open', function () {
    db.drop()
    .then(function () {
        return seed();
    })
    .then(function () {
        console.log('Seeding successful');
    }, function (err) {
        console.error('Error while seeding');
        console.error(err.stack);
    })
    .then(function () {
        process.exit();
    });
});







// var mongoose = require('mongoose');
// var Promise = require('bluebird');
// var chalk = require('chalk');
// var User = Promise.promisifyAll(mongoose.model('User'));
// var connectToDb = require('./server/db');

// var seedUsers = function () {

//     var users = [
//         {
//             email: 'testing@fsa.com',
//             password: 'password'
//         },
//         {
//             email: 'obama@gmail.com',
//             password: 'potus'
//         }
//     ];

//     return User.createAsync(users);

// };

// connectToDb.then(function () {
//     User.findAsync({}).then(function (users) {
//         if (users.length === 0) {
//             return seedUsers();
//         } else {
//             console.log(chalk.magenta('Seems to already be user data, exiting!'));
//             process.kill(0);
//         }
//     }).then(function () {
//         console.log(chalk.green('Seed successful!'));
//         process.kill(0);
//     }).catch(function (err) {
//         console.error(err);
//         process.kill(1);
//     });
// });
