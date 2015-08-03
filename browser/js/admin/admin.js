app.config(function ($stateProvider) {
    $stateProvider
    .state('admin', {
        url: '/admin',
        templateUrl: 'js/admin/admin.html',
        controller: 'AdminCtrl'
    })


app.controller('AdminCtrl', function($scope, $state, $http) {

	$scope.deleteUser = function (user) {
		return $http.delete('/api/users/' + user._id)
	}

	$scope.deleteIns = function (ins) {
		return $http.delete('/api/instructor/' + ins._id)
	}
	$scope.deleteProduct = function (product) {
		return $http.delete('/api/products/' + product._id)
	}

})