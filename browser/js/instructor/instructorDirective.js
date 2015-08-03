app.directive("instructor", function() {
  return {
    templateUrl: "/js/instructor/instructorTemplate.html",
    restrict: 'E'
      // scope: {
      //   instructor: "="
      // },
      // link: function(scope) {
      //   console.log("instructor:", scope.instructor);
      //   scope.rating = Math.round(scope.instructor.rating.ratingsAverage);
      // }
  }
})