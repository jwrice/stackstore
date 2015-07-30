app.directive('cart', function() {
  return {
  	restrict: 'E',
    templateUrl: 'js/cart/cart.directive.template.html',
    scope: {
    	user: '='
    }, 
    controller: 'CartCtrl'
  };
});