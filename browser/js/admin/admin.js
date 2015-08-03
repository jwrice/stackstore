app.config(function ($stateProvider) {
    $stateProvider
    .state('admin', {
        url: '/admin',
        templateUrl: 'js/admin/admin.html',
        controller: 'AdminCtrl'
    })
})


app.controller('AdminCtrl', function($scope, $state, $http,InstructorFactory,ProductsFactory) {

	$scope.deleteUser = function (user) {
		return $http.delete('/api/users/' + user._id)
			.then(function() {
				return $http.get('/api/users/')
				.then(function(users){
					$scope.users = users.data;
				})
			})
	}

	$scope.deleteIns = function (ins) {
		return $http.delete('/api/instructor/' + ins._id)
			.then(function() {
				InstructorFactory.getInstructors()
				.then(function(instructors){
					$scope.instructors = instructors;
				})
			})
	}
	$scope.deleteProduct = function (product) {
		return $http.delete('/api/products/' + product._id)
			.then(function() {
				ProductsFactory.getProducts()
				.then(function(products){
					$scope.products = products;
				})
			})
	}

	InstructorFactory.getInstructors()
	.then(function(instructors){
		$scope.instructors = instructors;
	})

	ProductsFactory.getProducts()
	.then(function(products){
		$scope.products = products;
	})

	$http.get('/api/users/')
	.then(function(users){
		$scope.users = users.data;
	})


})