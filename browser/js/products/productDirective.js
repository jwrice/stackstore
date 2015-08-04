app.directive("product", function() {
  return {
    templateUrl: "/js/products/productTemplate.html",
    restrict: 'E',
    controller: function($scope, ProductsFactory, CartFactory) {
      $scope.submit = function(product) {
        // console.log('product before', product)
        ProductsFactory.addProduct($scope.user, product)
          .then(function(user) {
            // console.log('user.cart after addProduct', user.cart)  
            return CartFactory.updateUser(user)
          })
          .then(function(user) {
            $scope.user = user;
            $rootScope.user = user;
          })
      }
    }
  }
})