'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Instructor = mongoose.model('Instructor');
var Auth = require('../auth.middleware.js')

router.get('/', function(req, res, next) {
	Instructor.find({})
		.exec()
		.then(function(instructors) {
			if (!instructors) throw "Error retrieving instructors";
			else {
				res.json(instructors);
			}
		})
		.then(null, next);
})

//create an instructor
router.post("/", function(req, res, next) {
	Instructor.create(req.body)
		.then(function(instructor) {
			res.json(instructor);
		})
		.then(null, next);
})

router.get("/:instructorId", function(req, res, next) {
	//A single instructor's page
	Instructor.findById(req.params.instructorId)
		.exec()
		.then(function(instructor) {
			if (!instructor) throw "This instructor does not exist";
			else {
				res.json(instructor);
			}
		})
		.then(null, next);
})
// change rating of instructor after transaction by user
router.put('/:instructorId/rating', function(req, res, next) {
	Instructor.findById(req.params.instructorId).exec()
		.then(function(instructor) {
			return instructor.makeAverage(req.body.number);
		})
		.then(function(instructor) {
			res.json(instructor);
		})
		.then(null, next)
})


//Auth authentication here
router.use('/:instructorId', function(req, res, next) {
	Auth.isAdmin(req, res, next);
});

//update the instructor
router.put("/:instructorId", function(req, res, next) {
	Instructor.findByIdAndUpdate(req.params.instructorId, req.body, {
			"new": true
		})
		.then(function(instructor) {
			res.json(instructor);
		})
		.then(null, next);
})


//update the instructor
router.delete("/:instructorId", function(req, res, next) {
	Instructor.findByIdAndRemove(req.params.instructorId).exec()
		.then(function(instructor) {
			res.status(200).send(instructor)
		})
		.then(null, next);
})