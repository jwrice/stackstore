'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Product = mongoose.model('Product');
var Instructor = mongoose.model('Instructor');
var Transaction = mongoose.model('Transaction');


// get all transactions so we can retrieve the instructor on the front-end
router.get('/:userId', function(req, res, next) {
    Transaction.findAll({user: {_id: req.params.userId}})
        .deepPopulate('product product.instructor')
        .exec()
        .then(function(transactions) {
            if (!transactions) throw "No transactions yet";
            else {
                res.json(transactions);
            }
        })
        .then(null, next);
})

//add new transaction and add info from ajax call
router.post("/:userId", function(req, res, next) {
    Transaction.create(req.body)
        .then(function(transaction) {
            User.findById(req.params.userId).exec()
                .then(function (user) {
                    user.pastPurchases.push(transaction)
                })
                .then(function () {
                    res.json(transaction);    
                })
        })
        .then(null, next);
})