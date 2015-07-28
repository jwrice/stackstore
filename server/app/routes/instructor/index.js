'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Instructor = mongoose.model('Instructor');

//create an instructor
router.post("/", function(req, res, next) {
	Instructor.create(req.body)
		.then(function(instructor) {
			Instructor.populate(instructor, {
				path: 'helpedStudents'
			}).populate(instructor, {
				path: 'offeredProducts'
			})
			res.json(instructor);
		})
		.then(null, next);
})

router.get("/:instructorId", function(req, res, next) {
	//A single instructor's page
	instructor.findOne({
			_id: req.params.instructorId
		})
		.populate('helpedStudents', 'offeredProducts')
		.exec()
		.then(function(instr) {
			if (!instr) throw "This instructor does not exist";
			else {
				res.json(instr);
			}
		})
		.then(null, next);
})

//update the instructor
router.put("/:instructorId", function(req, res, next) {
	Instructor.findByIdAndUpdate(req.params.instructorId, req.body)
		.populate("helpedStudents", "offeredProducts")
		.then(function(instructor) {
			res.json(instructor);
		})
		.then(null, next);
})

//update the instructor
router.delete("/:instructorId", function(req, res, next) {
	Instructor.findById(req.params.instructorId).exec()
		.then(function(instructor) {
			instructor.remove();
		})
		.then(null, next);
})