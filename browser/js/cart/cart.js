app.config(function ($stateProvider) {
    $stateProvider
    .state('cart', {
        url: '/cart',
        templateUrl: 'js/cart/cart.html',
        controller: 'CartCtrl'
    })
    .state('guestCart', {
        url: '/guestcart',
        templateUrl: 'js/cart/guest.html',
        controller: 'GuestCartCtrl'
    })
});

app.controller('CartCtrl', function($scope, $state, CartFactory) {

    CartFactory.getUser().then(function(user){
        $scope.user = user
    })
    console.log($scope.user)

    CartFactory.getCart($scope.user._id)
    .then(function(cart){
        console.log('user cart is', cart)
        $scope.cart = cart
    })

    $scope.submit = function (product) {
        CartFactory.addProduct($scope.user, product)
        .then(function(user){
            console.log(user)
            $scope.user = user
        })
    }

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
