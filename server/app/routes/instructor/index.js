'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Instructor = mongoose.model('Instructor');

router.get('/', function(req, res, next) {
	Instructor.find({})
		.populate('user', 'helpedStudents').populate('offeredProducts')
		.exec()
		.then(function(instructors) {
			console.log(instructors)
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
			return Instructor
			.populate(instructor, {
				path: 'user'
			})
		})
		.then(function(instructor){
			return Instructor
			.populate(instructor, {
				path: 'helpedStudents'
			})
		})
		.then(function(instructor){
			return Instructor
			.populate(instructor, {
				path: 'offeredProducts'
			})
		})
		.then(function(instructor) {
			res.json(instructor);
		})
		.then(null, next);
})

router.get("/:instructorId", function(req, res, next) {
	//A single instructor's page
	Instructor.findById(req.params.instructorId)
		.populate('user'
			// , 'helpedStudents', 'offeredProducts'
			// , 'helpedStudents').populate('offeredProducts'
			)
		.exec()
		.then(function(instructor) {
			if (!instructor) throw "This instructor does not exist";
			else {
				res.json(instructor);
			}
		})
		.then(null, next);
})

//update the instructor
router.put("/:instructorId", function(req, res, next) {
	console.log('body is:', req.body, "query is:", req.query)
	Instructor.findByIdAndUpdate(req.params.instructorId, req.body, {"new":true})
		.populate('user', "helpedStudents").populate('offeredProducts')
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