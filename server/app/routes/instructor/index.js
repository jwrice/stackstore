'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var instructor = mongoose.model('Instructor');
var product = mongoose.model('Product');

router.get("/:instructorId", function (req,res,next){
	//A single instructor's page
	instructor.findOne({_id: req.params.instructorId})
	.populate('helpedStudents','offeredProducts')
	.exec()
	.then(function(instr){
		if(!instr) throw "This instructor does not exist";
		else{
			res.json(instr);
		}
	})
	.then(null, next);

})

//authentication function


//add new product
router.post("/:instructorId", function (req, res, next){
	req.body.instructor = req.params.instructorId;
	product.create(req.body)
	.then(function (data){
		res.json(data);
	})
	.then(null, next);
})

//update a product
router.put("/:productId", function (req, res, next){
	product.update({ _id: req.params.productId }, { $set: req.body}, function (err, data){
		res.json(data);
		next();
	});
})

//delete a product
router.delete("/:productId", function (req, res, next){
	product.findOne({_id: req.params.productId})
	.remove()
	.exec()
	.then(null, next);
})