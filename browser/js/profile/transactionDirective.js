app.directive("trans", function() {
  return {
  	restrict: 'E',
    scope: {
    	instructor: '=',
		product: '=',
		transaction: '='
	},
    templateUrl: "/js/profile/transactionTemplate.html",
    controller: function($scope){
    // 	console.log(
    // 		'from transaction dir scope.instructor is:'
    // 		, $scope.instructor,
    // 		'from transaction dir scope.product is:'
    // 		, $scope.product,
    // 		'from transaction dir scope.transaction is:'
    // 		, $scope.transaction
    // 		)
    // }

  }
}
})