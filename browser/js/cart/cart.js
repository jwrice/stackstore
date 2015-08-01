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
    // console.log($scope.user)

    CartFactory.getCart($scope.user._id)
    .then(function(user){
        // console.log('after getting Cart, user is', user)
        $scope.user = user
    })

    $scope.submit = function (product) {
        CartFactory.addProduct($scope.user, product)
        .then(function(user){
            // console.log(user)
            $scope.user = user
        })
    }

    $scope.buyAndRemove = function (product){
        CartFactory.buyProduct($scope.user, product)
        .then(function(user){
            console.log('user after buying product', user)
            // $scope.user = user
            return user
        })
        .then(function(user){
            console.log('user cart before update', user.cart)
            return CartFactory.updateUser(user, product)
        })
        .then(function(user){
            console.log('user cart after update', user.cart)
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
