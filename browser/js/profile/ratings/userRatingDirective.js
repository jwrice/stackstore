app.directive('userRating', function() {
  return {
    restrict: 'E',
    templateUrl: '/js/profile/ratings/userRatingTemplate.html',
    controller: 'RatingCtrl'
  }
})