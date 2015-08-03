app.config(function($stateProvider) {
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

app.controller('CartCtrl', function($scope, $state, $rootScope, CartFactory) {

    CartFactory.getUser().then(function(user) {
        $scope.user = user
    })

    CartFactory.getCart($scope.user._id)
        .then(function(user) {
            $scope.user = user
        })

    $scope.buyAndRemove = function(product) {
        CartFactory.buyProduct($scope.user, product)
            .then(function(user) {
                return user
            })
            .then(function(user) {
                return CartFactory.updateUser(user)
            })
            .then(function(user) {
                $rootScope.user = user
            })
    }

    $scope.buyAll = function() {

        var newTransactionArr = []
        $scope.user.cart.forEach(function(product) {
                newTransactionArr.push(product._id);
            })
            // console.log('newTransactionArr', newTransactionArr)
        $scope.user.pastPurchases = $scope.user.pastPurchases.concat(newTransactionArr);
        $scope.user.cart = [];
        // console.log('pastPurchases after', $scope.user.pastPurchases);
        CartFactory.updateUser($scope.user)
            .then(function(user) {
                $rootScope.user = user
            })
    }

    $scope.removeFromCart = function(product) {
        $scope.user.cart = $scope.user.cart.filter(function(cartObj) {
            return cartObj._id !== product._id
        });
        CartFactory.updateUser($scope.user)
            .then(function(user) {
                $rootScope.user = user;
            })
    }


});


app.controller('GuestCartCtrl', function($scope, localStorageService) {

    $scope.submit = function(val) {
        if (!localStorageService.get("cartItems")) {
            localStorageService.set('cartItems', [val]);
        } else {
            var temp = localStorageService.get('cartItems');
            temp.push(val);
            localStorageService.set('cartItems', temp);
        }
    }

    $scope.retrieve = function() {
        if (localStorageService.get('cartItems')) {
            return localStorageService.get('cartItems');
        } else {
            console.log("There is nothing in the cart right now! Buy something!");
        }
    }

    $scope.delete = function(id) {
        var temp = localStorageService.get('cartItems');
        for (var i = 0; i < temp.length; i++) {
            if (temp[i]._id === id) {
                temp.splice(i, 1);
            }
        };
        localStorageService.set('cartItems', temp);
    }

    $scope.buyAll = function() {
        localStorageService.remove('cartItems');
    }

});