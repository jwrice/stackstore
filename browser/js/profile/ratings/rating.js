app.controller('RatingCtrl', function($scope) {
	
	$scope.noStars = new Array(5)

	$scope.setRating = function(index){
		$scope.userRating = index+1
		$scope.userStars = new Array($scope.userRating)
		$scope.transaction.rating = $scope.userRating
	}
})