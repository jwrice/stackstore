app.config(function($stateProvider) {
  $stateProvider
    .state('newuser', {
      url: '/newuser',
      templateUrl: 'js/newuser/newuser.html',
      controller: 'NewUserCtrl'
    })
});

app.controller('NewUserCtrl', function($scope, $state, NewUserFactory) {

  $scope.clearUserForm = function() {
    $scope.newuser = {
      firstName: null,
      lastName: null,
      email: null,
      password: null
    }
  }

  $scope.submitForm = function(newuser) {
    NewUserFactory.sendNewUser(newuser)
      .then(function(user) {
        console.log(user)
        $scope.clearUserForm()
        $state.go("login")
      }, function(err) {
        console.log(err)
      })
    console.log('new scope user is:', $scope.newuser)
  }

})