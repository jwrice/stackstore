app.config(function ($stateProvider) {
    $stateProvider
    .state('instructor', {
        url: '/instructor',
        templateUrl: 'js/instructor/instructors.html',
        controller: 'InstructorCtrl'
    })
    .state('singleInstructor', {
        url: '/instructor/:instructorId',
        templateUrl: 'js/instructor/oneInstructor.html',
        controller: 'InstructorOneCtrl'
    });
});

app.controller('InstructorCtrl', function($scope, $state, InstructorFactory, $stateParams) {
	InstructorFactory.getInstructors().then(function(res){
		// console.log(res)
		$scope.instructors = res
	})


})


app.controller('InstructorOneCtrl', function($scope, $state, InstructorFactory, $stateParams) {
		console.log('$stateParams.instructorId', $stateParams.instructorId)

	InstructorFactory.getOneInstructor($stateParams.instructorId)
	.then(function(instructor){
		console.log('res in controller', instructor)
		$scope.Oneinstructor = instructor;
	})

})