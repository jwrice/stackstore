app.config(function ($stateProvider) {
    $stateProvider
    .state('profile', {
        url: '/user/user/profile',
        templateUrl: 'js/profile/profile.html',
        controller: 'ProfileCtrl'
    })
});

app.controller('ProfileCtrl', function($scope, $state, $stateParams, AuthService, ProfileFactory) {

	var User = function(){
		AuthService.getLoggedInUser()
		.then(function(user){
			return ProfileFactory.getUser(user)
		})
		.then(function(response){
			$scope.user = response
			return response
		})
	}

	$scope.consoleme = function(){
		console.log($scope.user.pastPurchases)
	}

	User()

	// $scope.products = $scope.user.pastPurchases.forEach(return obj.product)

})