app.config(function ($stateProvider) {
    $stateProvider
    .state('profile', {
        url: '/users/profile',
        templateUrl: 'js/profile/profile.html',
        controller: 'ProfileCtrl'
        
    })
});

app.controller('ProfileCtrl', function($scope, $state, $stateParams, AuthService, ProfileFactory) {

	var getUser = function(){
		AuthService.getLoggedInUser().then(function(user){
			$scope.user = user
		})
	}

	$scope.editProfileItem = function(){
	}

	$scope.submitChange = function(){
	}

	getUser()

})