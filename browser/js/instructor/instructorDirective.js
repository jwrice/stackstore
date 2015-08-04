app.directive("instructor", function() {
  return {
    templateUrl: "/js/instructor/instructorTemplate.html",
    restrict: 'E',
    scope: {
      instructor: "="
    },
    link: function(scope) {
      scope.rating = Math.round(scope.instructor.rating.ratingsAverage);
    }
  }
})