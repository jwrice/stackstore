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

app.controller('CartCtrl', function($scope, $state, $rootScope, CartFactory, $http, $modal, $log, ModalService) {




    $scope.animationsEnabled = true;

    $scope.open = function () {
        console.log('hit it ')
        var modalInstance = $modal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'js/cart/modal.html',
          controller: 'ModalInstanceCtrl'
        });
    }

        // modalInstance.result.then(function (selectedItem) {
        //   $scope.selected = selectedItem;
        // }, 
        // function () {
        //   $log.info('Modal dismissed at: ' + new Date());
        //     }
        // });



    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };


   // $scope.open = function() {
   //  console.log('hit it')
   //      ModalService.showModal({
   //          templateUrl: 'js/cart/modal.html',
   //          controller: "ModalInstanceCtrl"
   //      }).then(function(modal) {
   //          modal.element.modal();
   //          modal.close.then(function(result) {
   //              $scope.message = "You said " + result;
   //          });
   //      });
   //  };



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
        $scope.user.cart.forEach(function (product) {
            $scope.buyAndRemove(product)
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


app.controller('ModalInstanceCtrl', function($scope, $modalInstance, $state, $http) {

    $scope.card = {
        number: null,
        cvc: null,
        exp_month: null,
        exp_year: null
    }

    Stripe.setPublishableKey('pk_test_9ylrl0TuXEASG7Hv4161uqKC');

    $scope.submit = function (cardInfo) {
        console.log('cardInfo', cardInfo)
        Stripe.card.createToken(cardInfo, function (status, response) {
            console.log('response', response)
            return $http.post('/stripe', response)
            .then(function () {
                $state.go('cart')
            })
        })
    }

    // var stripeResponseHandler = function(status, response) {
    //   var $form = $('#payment-form');
    //   if (response.error) {
    //     // Show the errors on the form
    //     $form.find('.payment-errors').text(response.error.message);
    //     $form.find('button').prop('disabled', false);
    //   } else {
    //     // token contains id, last4, and card type
    //     var token = response.id;
    //     // Insert the token into the form so it gets submitted to the server
    //     $form.append($('<input type="hidden" name="stripeToken" />').val(token));
    //     // and re-submit
    //     $form.get(0).submit();
    //   }
    // };


    // jQuery(function($) {
    //     var payForm = document.getElementById('payForm');
    //     console.log("running");
    //     console.log("form", payForm);
    //   $('#payForm').submit(function(e) {
    //     console.log('hit here',$(this))
    //     var $form = $(this);
    //     // Disable the submit button to prevent repeated clicks
    //     $form.find('button').prop('disabled', true);
    //     Stripe.card.createToken($form, stripeResponseHandler)
    //     // Prevent the form from submitting with the default action
    //     return false;
    //   });
    // });


    $scope.ok = function () {
        // $state.go('cart')
        $modalInstance.close($scope.selected.item);

    };

    $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
    };

})



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