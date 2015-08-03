app.controller('RatingCtrl', function($scope, InstructorFactory, TransactionFactory) {

  $scope.noStars = new Array(5)

  if ($scope.transaction.rating) {
    $scope.userStars = new Array($scope.transaction.rating);
  }

  $scope.setRating = function(index) {
    var rating = index + 1
    $scope.userStars = new Array(rating);
    $scope.transaction.rating = rating;
    console.log($scope.instructor._id, $scope.transaction._id, rating)
    InstructorFactory.makeRating($scope.instructor._id, rating)
      .then(function(instructor) {})
    TransactionFactory.makeRating($scope.transaction._id, rating)
      .then(function(transaction) {})
  }
});