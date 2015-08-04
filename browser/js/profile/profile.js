app.config(function($stateProvider) {
  $stateProvider
    .state('profile', {
      url: '/user/user/profile',
      templateUrl: 'js/profile/profile.html',
      controller: 'ProfileCtrl'
    })
});

app.controller('ProfileCtrl', function($scope, $state, $stateParams, AuthService, ProfileFactory, TransactionFactory, $http) {

  var User = function() {
    AuthService.getLoggedInUser()
      .then(function(user) {
        return ProfileFactory.getUser(user)
      })
      .then(function(response) {
        $scope.user = response
        console.log(response);
        return response
      })
  }

  User()

  $scope.submit = function() {
    return $http.put('/api/users/' + $scope.user._id, $scope.user)
      .then(function(res) {
        $scope.user = res.data;
      })
  }

})