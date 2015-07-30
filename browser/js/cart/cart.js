app.config(function ($stateProvider) {
    $stateProvider
    .state('cart', {
        url: '/users/:userId/cart',
        templateUrl: 'js/cart/cart.html',
        controller: 'CartCtrl'
    })
});

app.controller('CartCtrl', function($scope, $state, CartFactory, $stateParams) {
    
    CartFactory.getUser($stateParams.userId)
    .then(function(user){
        console.log('user is:', user)
        $scope.user = user
        $scope.user.cart = [
            {pd1: 'asdf'},
            {pd2: 'asdffd'}
        ]
        console.log('userCart:', $scope.user.cart)
    })

    $scope.delete = function (product) {
        console.log(product)
        var oldCart = $scope.user.cart,
            newCart;
        if (oldCart.length === 1){
            newCart = []
        } else {
            newCart = oldCart.splice(oldCart.indexOf(product._id)+1, 1)
        }
        $scope.user.cart = newCart
        console.log('oldCart:', oldCart, 'newCart:', newCart, 'user:', $scope.user)
        // CartFactory.editUser($scope.user)
        // .then(function(user){
        //     $scope.user = user    
        // })
        
    }

})