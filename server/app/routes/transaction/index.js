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
    var routeUser
    console.log('userId:', req.params.userId, 'req.body outside of .then is:', req.body)
    User.findById(req.params.userId).populate('cart').exec()
    .then(function (user) {
        routeUser = user
        // console.log('req.body within .then is:', req.body)
        // console.log('user is:', user)
        // console.log('user cart is:', user.cart)
        console.log('product id:', req.body._id)
        var price = user.cart.filter(function(cartObj){
            return cartObj._id == req.body._id
        })[0].price
        console.log('found price:', price)
       return Transaction.create({
           user: user._id,
           product: req.body._id,
           time : new Date(),
           price : price
       })
   })
   .then(function (transaction) {
        // routeUser.pastPurchases.push(transaction._id)
        // console.log('return transaction is:', transaction)
        // console.log('routeUser with new past Purchases:', routeUser)
        // return User.findByIdAndUpdate(transaction.user, routeUser, {new: true})
        // .exec()
        // .then(function(user){
        //     res.json(user)
        // })
       res.json(transaction)
       next()
   })
   .then(null, next)

})