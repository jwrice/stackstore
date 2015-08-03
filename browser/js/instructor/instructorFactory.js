app.factory('InstructorFactory', function($http) {
	return {
		getInstructors: function() {

			return $http.get('/api/instructor')
				.then(function(response) {
					return response.data
				})
		},
		getOneInstructor: function(instructorId) {
			return $http.get('/api/instructor/' + instructorId)
				.then(function(response) {
					return response.data
				})
		},
		makeRating: function(instructorId, num) {
			return $http.put('/api/instructor/' + instructorId, {
					number: num
				})
				.then(function(res) {
					return res.data;
				})
		}
	}
})