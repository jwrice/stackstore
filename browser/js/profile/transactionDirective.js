app.directive("trans", function() {
  return {
    restrict: 'E',
    scope: {
      instructor: '=',
      product: '=',
      transaction: '='
    },
    templateUrl: "/js/profile/transactionTemplate.html"
  }
})