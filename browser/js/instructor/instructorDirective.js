app.directive("instructor", function() {
  return {
    templateUrl: "/js/instructor/instructorTemplate.html",
    restrict: 'E',
    scope: {
      instructor: "="
    },
    link: function($scope) {
      if ($scope.instructor) console.log("instructor:", $scope.instructor);
      if ($scope.instructor && !$scope.instructor.rating) $scope.instructor.rating = Math.round($scope.instructor.rating.ratingsAverage);
    }
  }
})