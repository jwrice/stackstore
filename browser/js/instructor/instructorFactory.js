app.factory('InstructorFactory', function ($http) {
	return {
		getInstructors: function() {

			return $http.get('/api/instructor')
			.then(function (response){
				return response.data
			})
		},
		getOneInstructor: function(instructorId) {
			console.log('instrcId', instructorId)
			return $http.get('/api/instructor/' + instructorId)
			.then(function (response){
				console.log('response.data:', response.data)
				return response.data
			})
		}
	}
})