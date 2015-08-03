app.config(function ($stateProvider) {
    $stateProvider
    .state('profile', {
        url: '/user/user/profile',
        templateUrl: 'js/profile/profile.html',
        controller: 'ProfileCtrl'
    })
});

app.controller('ProfileCtrl', function($scope, $state, $stateParams, AuthService, ProfileFactory) {

	var getUser = function(){
		AuthService.getLoggedInUser()
		.then(function(user){
			return $http.get('/api/users'+userId)
		})
		.then(function(response){
			return response.data
		})
	}
	
	$scope.editProfileItem = function(){
	}

	$scope.submitChange = function(){
	}

	getUser()

})