app.config(function ($stateProvider) {
    $stateProvider
    .state('editUser', {
        url: '/admin/edituser/:userId',
        templateUrl: 'js/admin/editUser.html',
        controller: 'editUserCtrl'
    })
})

app.controller('editUserCtrl', function($scope,$http,$stateParams, $state){
    $http.get('api/users/'+$stateParams.userId).then(function(user){
        $scope.user = user.data;
    })
    $scope.submit = function(){
        return $http.put('/api/users/'+$stateParams.userId, $scope.user)
        .then(function (){
            $state.go('admin');
        })
    }
})