app.config(function ($stateProvider) {
    $stateProvider
    .state('cart', {
        url: '/users/:userId/cart',
        templateUrl: 'js/cart/cart.html',
        controller: 'CartCtrl'
    })
});

app.controller('CartCtrl', function($scope, $state, CartFactory, $stateParams) {

    CartFactory.getCart($stateParams.userId)
    .then(function(cart){
        console.log('user cart is', cart)
        $scope.cart = cart
    })


})