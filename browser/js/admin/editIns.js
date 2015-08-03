app.config(function($stateProvider){
	$stateProvider
	.state('editIns', {
		url: '/admin/editIns/:instructorId',
		templateUrl: 'js/admin/editIns.html',
		controller: 'editInsCtrl'
	})
})

app.controller('editInsCtrl', function($scope,$http,$stateParams, $state){
	$http.get('api/instructor/'+$stateParams.instructorId).then(function(instructor){
		$scope.instructor = instructor.data;
	})
	$scope.submit = function(){
		return $http.put('/api/instructor/'+$stateParams.instructorId, $scope.instructor)
		.then(function (){
			$state.go('admin');
		})
	}
})