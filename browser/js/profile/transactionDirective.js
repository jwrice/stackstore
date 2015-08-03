app.directive("trans", function() {
  return {
    restrict: 'E',
    scope: {
      instructor: '=',
      product: '=',
      transaction: '='
    },
    templateUrl: "/js/profile/transactionTemplate.html",
    controller: function($scope, InstructorFactory, TransactionFactory) {
      $scope.giveProductRating = function(instructorId, transactionId, rating) {
        console.log(instructorId, transactionId, rating);
        InstructorFactory.makeRating(instructorId, rating)
          .then(function(instructor) {
            console.log("instr:", instructor);
          })
        TransactionFactory.makeRating(transactionId, rating)
          .then(function(transaction) {
            console.log("trans:", transaction);
          });
      }
    }
  }
})