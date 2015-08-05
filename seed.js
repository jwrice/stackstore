// // /*
// // This seed file is only a placeholder. It should be expanded and altered
// // to fit the development of your application.
// // It uses the same file the server uses to establish
// // the database connection:
// // --- server/db/index.js
// // The name of the database used is set in your environment files:
// // --- server/env/*
// // This seed file has a safety check to see if you already have users
// // in the database. If you are developing multiple applications with the
// // fsg scaffolding, keep in mind that fsg always uses the same database
// // name in the environment files.
// // */

// var chance = require('chance')(123),
//   _ = require('lodash');
// var mongoose = require('mongoose');
// var Promise = require('bluebird');
// var chalk = require('chalk');
// var connectToDb = require('./server/db');
// var User = Promise.promisifyAll(mongoose.model('User'));
// var Instructor = Promise.promisifyAll(mongoose.model('Instructor'));
// var Product = Promise.promisifyAll(mongoose.model('Product'));

// var numUsers = 15;
// var numIns = 15;
// var numProducts = 20;
// var emails = chance.unique(chance.email, 1000);
// var categories = ["JavaScript", "Java", "Python", "C++", "Ruby", "Objective-C"];
// var existingUsers = []
// var existingPds = [{
//   title: "Get Angular Skills, Son!",
//   serviceDescription: "Sed dicat tation urbanitas ea, liber labitur cum in, ullum definiebas ad sed. Id amet exerci graeci mea, dicit dolor possit eos te.",
//   price: 2976,
//   timeAvailable: 52,
//   instructor: "55c166a2ff76a62092fe84b3",
//   categories: [
//     "ALL",
//     "Java"
//   ]
// },
// {
//   title: "Is Your Computer Running Slowly? Welcome to MacKeeper 101",
//   serviceDescription: "ix invenire mnesarchum dissentiet, ea per verear oblique. Sea ad dicam invenire, purto omnes electram id sed, audiam saperet mentitum",
//   price: 1490,
//   timeAvailable: 93,
//   instructor: "55c166a2ff76a62092fe84b5",
//   categories: [
//     "ALL",
//     "Objective-C"
//   ]
// },
// {
//   title: "Get Angular Skills, Son!",
//   serviceDescription: "Lorem ipsum dolor sit amet, error iusto quidam qui ex. No vis nostrum laboramus. Nibh eruditi maluisset eam ea, ea eos solum erant.",
//   price: 3078,
//   timeAvailable: 109,
//   instructor: "55c166a2ff76a62092fe84ba",
//   categories: [
//     "ALL",
//     "Java"
//   ]
// },
// {
//   title: "\"Restart\" Versus \"Shutdown\" - What You Dont Know Could Hurt You",
//   serviceDescription: "utinam equidem accusamus ne duo, amet commodo disputationi est te. Honestatis scriptorem mel te, usu ex minim vocent om",
//   price: 3878,
//   timeAvailable: 111,
//   instructor: "55c166a2ff76a62092fe84b4",
//   categories: [
//     "ALL",
//     "Objective-C"
//   ]
// },
// {
//   title: "The Browser URL Bar: Challenges and Solutions",
//   serviceDescription: "Lorem ipsum dolor sit amet, error iusto quidam qui ex. No vis nostrum laboramus. Nibh eruditi maluisset eam ea, ea eos solum erant.",
//   price: 1064,
//   timeAvailable: 77,
//   instructor: "55c166a2ff76a62092fe84b5",
//   categories: [
//     "ALL",
//     "Java"
//   ]
// },
// {
//   title: "Uncovering The Keyboard: How to Capitalize, Underline, and Bold Text",
//   serviceDescription: "ius deleniti invidunt quaestio. Facilisis euripidis disputando no mei. Dicta salutatus cu nec. Usu ea latine euismod perpetua, nam meliore",
//   price: 2325,
//   timeAvailable: 71,
//   instructor: "55c166a2ff76a62092fe84bc",
//   categories: [
//     "ALL",
//     "Java"
//   ]
// },
// {
//   title: "Is Your Computer Running Slowly? Welcome to MacKeeper 101",
//   serviceDescription: "ius deleniti invidunt quaestio. Facilisis euripidis disputando no mei. Dicta salutatus cu nec. Usu ea latine euismod perpetua, nam meliore",
//   price: 4002,
//   timeAvailable: 78,
//   instructor: "55c166a2ff76a62092fe84b7",
//   categories: [
//     "ALL",
//     "Objective-C"
//   ]
// },
// {
//   title: "Brackets and Parentheses: What are they, anyway?",
//   serviceDescription: "utinam equidem accusamus ne duo, amet commodo disputationi est te. Honestatis scriptorem mel te, usu ex minim vocent om",
//   price: 2736,
//   timeAvailable: 44,
//   instructor: "55c166a2ff76a62092fe84b5",
//   categories: [
//     "ALL",
//     "Python"
//   ]
// },
// {
//   title: "",
//   serviceDescription: "utinam equidem accusamus ne duo, amet commodo disputationi est te. Honestatis scriptorem mel te, usu ex minim vocent om",
//   price: 2564,
//   timeAvailable: 70,
//   instructor: "55c166a2ff76a62092fe84bb",
//   categories: [
//     "ALL",
//     "Java"
//   ]
// },
// {
//   title: "Uncovering The Keyboard: How to Capitalize, Underline, and Bold Text",
//   serviceDescription: "ix invenire mnesarchum dissentiet, ea per verear oblique. Sea ad dicam invenire, purto omnes electram id sed, audiam saperet mentitum",
//   price: 2458,
//   timeAvailable: 119,
//   instructor: "55c166a2ff76a62092fe84b4",
//   categories: [
//     "ALL",
//     "Java"
//   ]
// },
// {
//   title: "5 JS Libraries for Abstracting All Complexity Out of Your Entire Life",
//   serviceDescription: "Vix ut wisi causae laoreet, ex ius deleniti invidunt quaestio. Facilisis euripidis disputando no mei. Dicta salutatus cu nec. Usu ea latine euism",
//   price: 2237,
//   timeAvailable: 64,
//   instructor: "55c166a2ff76a62092fe84b3",
//   categories: [
//     "ALL",
//     "Ruby"
//   ]
// },
// {
//   title: "Uncovering The Keyboard: How to Capitalize, Underline, and Bold Text",
//   serviceDescription: "ius deleniti invidunt quaestio. Facilisis euripidis disputando no mei. Dicta salutatus cu nec. Usu ea latine euismod perpetua, nam meliore",
//   price: 4597,
//   timeAvailable: 68,
//   instructor: "55c166a2ff76a62092fe84bb",
//   categories: [
//     "ALL",
//     "Java"
//   ]
// },
// {
//   title: "The Browser URL Bar: Challenges and Solutions",
//   serviceDescription: "Cu tibique corpora scripserit pro, cu verterem imperdiet qui, sea dicunt tincidunt ne. Iisque feugait commune ex vis. Delenit debitis ius in",
//   price: 4291,
//   timeAvailable: 32,
//   instructor: "55c166a2ff76a62092fe84b6",
//   categories: [
//     "ALL",
//     "JavaScript"
//   ]
// },
// {
//   title: "Uncovering The Keyboard: How to Capitalize, Underline, and Bold Text",
//   serviceDescription: "Sed dicat tation urbanitas ea, liber labitur cum in, ullum definiebas ad sed. Id amet exerci graeci mea, dicit dolor possit eos te.",
//   price: 3567,
//   timeAvailable: 104,
//   instructor: "55c166a2ff76a62092fe84b8",
//   categories: [
//     "ALL",
//     "Objective-C"
//   ]
// },
// {
//   title: "Browsing Youtube for Dummies",
//   serviceDescription: "ius deleniti invidunt quaestio. Facilisis euripidis disputando no mei. Dicta salutatus cu nec. Usu ea latine euismod perpetua, nam meliore",
//   price: 4629,
//   timeAvailable: 31,
//   instructor: "55c166a2ff76a62092fe84b6",
//   categories: [
//     "ALL",
//     "Ruby"
//   ]
// },
// {
//   title: "Browsing Youtube for Dummies",
//   serviceDescription: "utinam equidem accusamus ne duo, amet commodo disputationi est te. Honestatis scriptorem mel te, usu ex minim vocent om",
//   price: 4270,
//   timeAvailable: 97,
//   instructor: "55c166a2ff76a62092fe84bc",
//   categories: [
//     "ALL",
//     "C++"
//   ]
// },
// {
//   title: "5 JS Libraries for Abstracting All Complexity Out of Your Entire Life",
//   serviceDescription: "Vix ut wisi causae laoreet, ex ius deleniti invidunt quaestio. Facilisis euripidis disputando no mei. Dicta salutatus cu nec. Usu ea latine euism",
//   price: 4985,
//   timeAvailable: 98,
//   instructor: "55c166a2ff76a62092fe84b3",
//   categories: [
//     "ALL",
//     "Java"
//   ]
// },
// {
//   title: "Brackets and Parentheses: What are they, anyway?",
//   serviceDescription: "Cu tibique corpora scripserit pro, cu verterem imperdiet qui, sea dicunt tincidunt ne. Iisque feugait commune ex vis. Delenit debitis ius in",
//   price: 3714,
//   timeAvailable: 62,
//   instructor: "55c166a2ff76a62092fe84b8",
//   categories: [
//     "ALL",
//     "Python"
//   ]
// },
// {
//   title: "The Browser URL Bar: Challenges and Solutions",
//   serviceDescription: "ius deleniti invidunt quaestio. Facilisis euripidis disputando no mei. Dicta salutatus cu nec. Usu ea latine euismod perpetua, nam meliore",
//   price: 3856,
//   timeAvailable: 66,
//   instructor: "55c166a2ff76a62092fe84bc",
//   categories: [
//     "ALL",
//     "Python"
//   ]
// },
// {
//   title: "The Browser URL Bar: Challenges and Solutions",
//   serviceDescription: "Sed dicat tation urbanitas ea, liber labitur cum in, ullum definiebas ad sed. Id amet exerci graeci mea, dicit dolor possit eos te.",
//   price: 3085,
//   timeAvailable: 82,
//   instructor: "55c166a2ff76a62092fe84b6",
//   categories: [
//     "ALL",
//     "Objective-C"
//   ]
// }]
  
// // var existingIns = [
// //   fullName: "Hannah Stevenson",
// //   email: "wu@tonin.edu",
// //   picture: "joe",
// //   rating: {
// //     numOfRat: 44,
// //     ratingsAverage: 3
// //   }
// // },
// // {
// //   fullName: "Esther Poole",
// //   email: "kalo@sokum.com",
// //   picture: "joe",
// //   rating: {
// //     numOfRat: 45,
// //     ratingsAverage: 3
// //   }
// // },
// // {
// //   fullName: "Travis Pierce",
// //   email: "apoinpe@bij.io",
// //   picture: "gabe",
// //   rating: {
// //     numOfRat: 25,
// //     ratingsAverage: 5
// //   }
// // },
// // {
// //   fullName: "Celia Shelton",
// //   email: "ekisutjul@ahtove.com",
// //   picture: "scott",
// //   rating: {
// //     numOfRat: 50,
// //     ratingsAverage: 4
// //   }
// // },
// // {
// //   fullName: "Josephine Bell",
// //   email: "zuav@om.gov",
// //   picture: "gabe",
// //   rating: {
// //     numOfRat: 24,
// //     ratingsAverage: 4
// //   }
// // },
// // {
// //   fullName: "Chase Mitchell",
// //   email: "uzoho@hu.gov",
// //   picture: "jimmy",
// //   rating: {
// //     numOfRat: 45,
// //     ratingsAverage: 1
// //   }
// // },
// // {
// //   fullName: "Hannah Stevenson",
// //   email: "wu@tonin.edu",
// //   picture: "zeke",
// //   rating: {
// //     numOfRat: 44,
// //     ratingsAverage: 3
// //   }
// // },
// // {
// //   fullName: "Adele Reynolds",
// //   email: "acubizfew@pesohu.org",
// //   picture: "omri",
// //   rating: {
// //     numOfRat: 17,
// //     ratingsAverage: 1
// //   }
// // },
// // {
// //   fullName: "Josephine Richardson",
// //   email: "seja@licgolul.org",
// //   picture: "zeke",
// //   rating: {
// //     numOfRat: 20,
// //     ratingsAverage: 4
// //   }
// // },
// // {
// //   fullName: "Calvin Manning",
// //   email: "ogijeaja@veifus.com",
// //   picture: "joe",
// //   rating: {
// //     numOfRat: 13,
// //     ratingsAverage: 5
// //   }
// // },
// // {
// //   fullName: "Hunter Ross",
// //   email: "nikok@ejrib.gov",
// //   picture: "scott",
// //   rating: {
// //     numOfRat: 48,
// //     ratingsAverage: 4
// //   }
// // },
// // {
// //   fullName: "Josephine Bell",
// //   email: "zuav@om.gov",
// //   picture: "jimmy",
// //   rating: {
// //     numOfRat: 24,
// //     ratingsAverage: 4
// //   }
// // },
// // {
// //   fullName: "Travis Pierce",
// //   email: "apoinpe@bij.io",
// //   picture: "joe",
// //   rating: {
// //     numOfRat: 25,
// //     ratingsAverage: 5
// //   }
// // },
// // {
// //   fullName: "Celia Shelton",
// //   email: "ekisutjul@ahtove.com",
// //   picture: "gabe",
// //   rating: {
// //     numOfRat: 50,
// //     ratingsAverage: 4
// //   }
// // },
// // {
// //   fullName: "Chase Mitchell",
// //   email: "uzoho@hu.gov",
// //   picture: "omri",
// //   rating: {
// //     numOfRat: 45,
// //     ratingsAverage: 1
// //   }
// // },
// // {
// //   fullName: "Esther Poole",
// //   email: "kalo@sokum.com",
// //   picture: "jimmy",
// //   rating: {
// //     numOfRat: 45,
// //     ratingsAverage: 3
// //   }
// // },
// // {
// //   fullName: "Calvin Manning",
// //   email: "ogijeaja@veifus.com",
// //   picture: "scott",
// //   rating: {
// //     numOfRat: 13,
// //     ratingsAverage: 5
// //   }
// // },
// // {
// //   fullName: "Adele Reynolds",
// //   email: "acubizfew@pesohu.org",
// //   picture: "zeke",
// //   rating: {
// //     numOfRat: 17,
// //     ratingsAverage: 1
// //   }
// // },
// // {
// //   fullName: "Josephine Richardson",
// //   email: "seja@licgolul.org",
// //   picture: "omri",
// //   rating: {
// //     numOfRat: 20,
// //     ratingsAverage: 4
// //   }
// // },
// // {
// //   fullName: "Hunter Ross",
// //   email: "nikok@ejrib.gov",
// //   picture: "gabe",
// //   rating: {
// //     numOfRat: 48,
// //     ratingsAverage: 4
// //   }
// // }]


// // // function randIns() {
// // //   var rating = chance.natural({
// // //     min: 1,
// // //     max: 5
// // //   })
// // //   var num = chance.natural({
// // //     min: 10,
// // //     max: 50
// // //   })
// // //   return Instructor.create({
// // //     fullName: chance.first() + ' ' + chance.last(),
// // //     email: emails.pop(),
// // //     rating: {
// // //       numOfRat: num,
// // //       ratingsAverage: rating
// // //     },
// // //     picture: randImg()
// // //   })
// // // }

// // // function randTitle() {
  
// // //   var choiceTitles = [
// // //   'Get Angular Skills, Son!',
// // //   'Dont Sweat SQL',
// // //   '5 JS Libraries for Abstracting All Complexity Out of Your Entire Life',
// // //   'Browsing Youtube for Dummies',
// // //   'Bookmarking Sites: Challenges and Solutions',
// // //   'Uncovering The Keyboard: How to Capitalize, Underline, and Bold Text',
// // //   'Brackets and Parentheses: What are they, anyway?', '"Restart" Versus "Shutdown" - What You Dont Know Could Hurt You',
// // //   'Is Your Computer Running Slowly? Welcome to MacKeeper 101',
// // //   'Cut, Copy, Paste - A Power Users Guide',
// // //   'Whiteboard Erasers: A Species on the Verge of Extinction',
// // //   'Addition, Subtraction, and other Mysteries of the Universe']
  
// // //   var titleIndex = Math.floor(Math.random() * (choiceTitles.length))

// // //   return choiceTitles[titleIndex]

// // // }

// // // function randDescription() {

// // //   var choiceDescriptions = ['Lorem ipsum dolor sit amet, error iusto quidam qui ex. No vis nostrum laboramus. Nibh eruditi maluisset eam ea, ea eos solum erant.',
// // //   'ix invenire mnesarchum dissentiet, ea per verear oblique. Sea ad dicam invenire, purto omnes electram id sed, audiam saperet mentitum',
// // //   'Sed dicat tation urbanitas ea, liber labitur cum in, ullum definiebas ad sed. Id amet exerci graeci mea, dicit dolor possit eos te.',
// // //   'Cu tibique corpora scripserit pro, cu verterem imperdiet qui, sea dicunt tincidunt ne. Iisque feugait commune ex vis. Delenit debitis ius in',
// // //   'Vix ut wisi causae laoreet, ex ius deleniti invidunt quaestio. Facilisis euripidis disputando no mei. Dicta salutatus cu nec. Usu ea latine euism',
// // //   'utinam equidem accusamus ne duo, amet commodo disputationi est te. Honestatis scriptorem mel te, usu ex minim vocent om',
// // //   'ius deleniti invidunt quaestio. Facilisis euripidis disputando no mei. Dicta salutatus cu nec. Usu ea latine euismod perpetua, nam meliore'
// // //   ]
  
// // //   var descriptionIndex = Math.floor(Math.random() * (choiceDescriptions.length))

// // //   return choiceDescriptions[descriptionIndex]
  
// // // }

// // // function randProduct(allIns) {
// // //   var instructor = chance.pick(allIns);
// // //   var price = chance.natural({
// // //     min: 1000,
// // //     max: 5000
// // //   });
// // //   var timeAvailable = chance.natural({
// // //     min: 30,
// // //     max: 120
// // //   })
// // //   return Product.create({
// // //     title: randTitle(),
// // //     serviceDescription: randDescription(),
// // //     price: price,
// // //     timeAvailable: timeAvailable,
// // //     instructor: instructor._id,
// // //     categories: ["ALL", chance.pick(categories)]
// // //   });
// // // }

// // // function randImg() {
// // //   var randNum = Math.floor(Math.random() * 6);
// // //   var picArr = ['zeke', 'scott', 'omri', 'joe', 'jimmy', 'gabe'];
// // //   return picArr[randNum];
// // // }



// // function seedInstructors() {
// //   // var instructors = [];
// //   // for (var i = 0; i < numIns; i++) {
// //   //   randIns().then(function(ins) {
// //   //     instructors.push(ins);
// //   //     existingIns = instructors;
// //   //   })
// //   // };

// //   return Instructor.createAsync(existingIns);

// // };


// function seedProducts() {
//   // var products = [];
//   // for (var i = 0; i < numProducts; i++) {
//   //   randProduct(existingIns).then(function(prd) {
//   //     products.push(prd);
//   //     existingPds = products;
//   //   })
//   // };

//   return Product.createAsync(existingPds);
// }
// // function seedUsers() {
// //   var users = [];
// //   User.create({
// //     lastName: "Super",
// //     firstName: "User",
// //     email: 'superuser@gmail.com',
// //     password: '123',
// //     isAdmin: true,
// //     salt: User.generateSalt(),
// //     cart: [],
// //     pastPurchases: []
// //   }).then(function(user) {
// //     users.push(user);
// //   })
// //   for (var i = 0; i < numUsers; i++) {
// //     randUser(existingPds).then(function(user) {
// //       users.push(user);
// //     })
// //   };
// //   return User.createAsync(users);

// // };

// connectToDb.then(function() {
//   User.findAsync({}).then(function() {
//     return seedProducts();
//   }).then(function() {
//     console.log(chalk.green('Seed successful!'));
//     process.kill(0);
//   }).catch(function(err) {
//     console.error(err);
//     process.kill(1);
//   });
// });

// /*
// This seed file is only a placeholder. It should be expanded and altered
// to fit the development of your application.
// It uses the same file the server uses to establish
// the database connection:
// --- server/db/index.js
// The name of the database used is set in your environment files:
// --- server/env/*
// This seed file has a safety check to see if you already have users
// in the database. If you are developing multiple applications with the
// fsg scaffolding, keep in mind that fsg always uses the same database
// name in the environment files.
// */

// // var chance = require('chance')(123),
// //   _ = require('lodash');
// // var mongoose = require('mongoose');
// // var Promise = require('bluebird');
// // var chalk = require('chalk');
// // var connectToDb = require('./server/db');
// // var User = Promise.promisifyAll(mongoose.model('User'));
// // var Instructor = Promise.promisifyAll(mongoose.model('Instructor'));
// // var Product = Promise.promisifyAll(mongoose.model('Product'));

// // var numUsers = 10;
// // var numIns = 5;
// // var numProducts = 20;
// // var emails = chance.unique(chance.email, 100);
// // var categories = ["JavaScript", "Java", "Python", "C++", "Ruby", "Objective-C"];

// // function randUser(pds) {
// //   return User.create({
// //     lastName: chance.last(),
// //     firstName: chance.first(),
// //     email: emails.pop(),
// //     password: chance.word(),
// //     salt: User.generateSalt(),
// //     cart: [chance.pick(pds)._id],
// //     pastPurchases: [chance.pick(pds)._id]
// //   });
// // }


// // function randIns() {
// //   var rating = chance.natural({
// //     min: 1,
// //     max: 5
// //   })
// //   var num = chance.natural({
// //     min: 10,
// //     max: 50
// //   })
// //   return Instructor.create({
// //     fullName: chance.first() + ' ' + chance.last(),
// //     email: emails.pop(),
// //     rating: {
// //       numOfRat: num,
// //       ratingsAverage: rating
// //     },
// //     picture: randImg()
// //   })
// // }

// // function randTitle() {
  
// //   var choiceTitles = [
// //   'Get Angular Skills, Son!',
// //   'Dont Sweat SQL',
// //   '5 JS Libraries for Abstracting All Complexity Out of Your Entire Life',
// //   'Browsing Youtube for Dummies',
// //   'Bookmarking Sites: Challenges and Solutions',
// //   'Uncovering The Keyboard: How to Capitalize, Underline, and Bold Text',
// //   'Brackets and Parentheses: What are they, anyway?', '"Restart" Versus "Shutdown" - What You Dont Know Could Hurt You',
// //   'Is Your Computer Running Slowly? Welcome to MacKeeper 101',
// //   'Cut, Copy, Paste - A Power Users Guide',
// //   'Whiteboard Erasers: A Species on the Verge of Extinction',
// //   'Addition, Subtraction, and other Mysteries of the Universe']
  
// //   var titleIndex = Math.floor(Math.random() * (choiceTitles.length))

// //   return choiceTitles[titleIndex]

// // }

// // function randDescription() {

// //   var choiceDescriptions = ['Lorem ipsum dolor sit amet, error iusto quidam qui ex. No vis nostrum laboramus. Nibh eruditi maluisset eam ea, ea eos solum erant.',
// //   'ix invenire mnesarchum dissentiet, ea per verear oblique. Sea ad dicam invenire, purto omnes electram id sed, audiam saperet mentitum',
// //   'Sed dicat tation urbanitas ea, liber labitur cum in, ullum definiebas ad sed. Id amet exerci graeci mea, dicit dolor possit eos te.',
// //   'Cu tibique corpora scripserit pro, cu verterem imperdiet qui, sea dicunt tincidunt ne. Iisque feugait commune ex vis. Delenit debitis ius in',
// //   'Vix ut wisi causae laoreet, ex ius deleniti invidunt quaestio. Facilisis euripidis disputando no mei. Dicta salutatus cu nec. Usu ea latine euism',
// //   'utinam equidem accusamus ne duo, amet commodo disputationi est te. Honestatis scriptorem mel te, usu ex minim vocent om',
// //   'ius deleniti invidunt quaestio. Facilisis euripidis disputando no mei. Dicta salutatus cu nec. Usu ea latine euismod perpetua, nam meliore'
// //   ]
  
// //   var descriptionIndex = Math.floor(Math.random() * (choiceDescriptions.length))

// //   return choiceDescriptions[descriptionIndex]
  
// // }

// // function randProduct(allIns) {
// //   var instructor = chance.pick(allIns);
// //   var price = chance.natural({
// //     min: 1000,
// //     max: 5000
// //   });
// //   var timeAvailable = chance.natural({
// //     min: 30,
// //     max: 120
// //   })
// //   return Product.create({
// //     title: randTitle(),
// //     serviceDescription: randDescription(),
// //     price: price,
// //     timeAvailable: timeAvailable,
// //     instructor: instructor._id,
// //     categories: ["ALL", chance.pick(categories)]
// //   });
// // }

// // function randImg() {
// //   var randNum = Math.floor(Math.random() * 6);
// //   var picArr = ['zeke', 'scott', 'omri', 'joe', 'jimmy', 'gabe'];
// //   return picArr[randNum];
// // }

// // var existingIns = []

// // var seedInstructors = function() {
// //   var instructors = [];
// //   for (var i = 0; i < numIns; i++) {
// //     randIns().then(function(ins) {
// //       instructors.push(ins);
// //       existingIns = instructors;
// //     })
// //   };

// //   return Instructor.createAsync(instructors);

// // };

// // var existingPds = [];

// // var seedProducts = function() {
// //   var products = [];
// //   for (var i = 0; i < numProducts; i++) {
// //     randProduct(existingIns).then(function(prd) {
// //       products.push(prd);
// //       existingPds = products;
// //     })
// //   };

// //   return Product.createAsync(products);
// // }
// // var seedUsers = function() {
// //   var users = [];
// //   User.create({
// //     lastName: "Super",
// //     firstName: "User",
// //     email: 'superuser@gmail.com',
// //     password: '123',
// //     isAdmin: true,
// //     salt: User.generateSalt(),
// //     cart: [],
// //     pastPurchases: []
// //   }).then(function(user) {
// //     users.push(user);
// //   })
// //   // for (var i = 0; i < numUsers; i++) {
// //   //   randUser(existingPds).then(function(user) {
// //   //     users.push(user);
// //   //   })
// //   // };
// //   return User.createAsync(users);

// // };

// // connectToDb.then(function() {
// //   User.findAsync({}).then(function(users) {
// //     if (users.length === 0) {
// //       return seedUsers();
// //     } else {
// //       console.log(chalk.magenta('Seems to already be instructor data, exiting!'));
// //       process.kill(0);
// //     }
// //   }).then(function() {
// //     return seedProducts();
// //   }).then(function() {
// //     return seedUsers();
// //   }).then(function() {
// //     console.log(chalk.green('Seed successful!'));
// //     process.kill(0);
// //   }).catch(function(err) {
// //     console.error(err);
// //     process.kill(1);
// //   });
// // });
