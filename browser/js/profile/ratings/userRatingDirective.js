app.directive('userRating', function() {
  return {
  	// scope: {
  	// 	transaction: "="
  	// },
    restrict: 'E',
    templateUrl: '/js/profile/ratings/userRatingTemplate.html',
    controller: 'RatingCtrl',
    scope: {
    	instructor: '=',
		  product: '=',
		  transaction: '='
    }
  }
})