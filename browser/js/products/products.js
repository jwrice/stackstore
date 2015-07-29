app.config(function ($stateProvider) {
    $stateProvider.state('products', {
        url: '/products',
        controller: 'ProductsController',
        templateUrl: 'js/products/products.html'
    });

});

app.controller('ProductsController', function ($scope, $http) {
	$scope.cats = ["ALL","Python","Java","JavaScript","Ruby","Objective-C"];
	$scope.changed = function(category){
		$scope.category = category;
	}
	$http.get('/api/products/')
	.success(function (products){
		$scope.products = products;
	})
	$http.get('/api/instructor/')
	.success(function (instructors){
		$scope.instructors = instructors;
		console.log(instructors,"this is in the controller");
	})
});