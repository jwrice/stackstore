app.controller('transRatingController', function($scope){

		this.initialize = function(){
			$scope.preview = -1
			$scope.stars = new Array(5)
		}

		$scope.click = function($index) {
			$scope.userInput = $index + 1;
		}

		$scope.mouseover = function($index) {
			$scope.preview = $index;
		}

		$scope.mouseout = function() {
			$scope.preview = -1
		}

		$scope.styles = function ($index) {
            return {
                "glyphicon": true,
                "glyphicon-star": $index < $scope.value,
                "glyphicon-star-empty": $index >= $scope.value,
                "starpreview": $index <= $scope.preview
            };
        };
})

app.directive('transRating', function(){
	return {
		scope: {
			userinput: "="
		},
		require: "transRating",
		templateUrl: 'rating.html',
		controller: "transRatingController",
		link: function(scope, element, attributes, controller) {
			controller.initialize()
		}
	}
})