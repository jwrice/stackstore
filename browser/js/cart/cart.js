app.config(function ($stateProvider) {
    $stateProvider
    .state('cart', {
        url: '/users/:userId/cart',
        templateUrl: 'js/cart/cart.html',
        controller: 'CartCtrl'
    })
    .state('guestCart', {
        url: '/guestcart',
        templateUrl: 'js/cart/guest.html',
        controller: 'GuestCartCtrl'
    })
});

app.controller('CartCtrl', function($scope, $state, CartFactory, $stateParams) {

    CartFactory.getCart($stateParams.userId)
    .then(function(cart){
        console.log('user cart is', cart)
        $scope.cart = cart
    })


});


app.controller('GuestCartCtrl', function($scope, localStorageService) {

    $scope.submit = function (val) {
        if (!localStorageService.get("cartItems")){
            localStorageService.set('cartItems', [val]);
        }else{
            var temp = localStorageService.get('cartItems');
            temp.push(val);
            localStorageService.set('cartItems', temp);
        }
    }

    $scope.retrieve = function(){
        if (localStorageService.get('cartItems')) {
            return localStorageService.get('cartItems');
        }else{
            console.log("There is nothing in the cart right now! Buy something!");
        }
    }

});
