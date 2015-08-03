app.directive("trans", function() {
  return {
    scope: {
    	instructor: '=',
		product: '='
	},
    templateUrl: "/js/profile/transactionTemplate.html"
  }
})