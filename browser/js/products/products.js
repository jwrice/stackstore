app.config(function ($stateProvider) {
    $stateProvider.state('products', {
        url: '/products',
        controller: 'ProductsController',
        templateUrl: 'js/products/products.html'
    });

});

app.controller('ProductsController', function ($scope, ProductsFactory ,InstructorFactory,$http) {
	$scope.cats = ["ALL","Python","Java","JavaScript","Ruby","Objective-C"];
	$scope.changed = function(category){
		$scope.category = category;
	}
	ProductsFactory.getProducts().then(function(products){
		$scope.products = products;
	})

	InstructorFactory.getInstructors().then(function(instr){
		$scope.instructors = instr;
	})
	
	$scope.choose = function(ins){
		$scope.insIds = ins;
	}

	$scope.getUser = function(id){
		$http.get('api/users/'+id).then(function(user){
			$scope.name = user.firstName + user.lastName;
		})
		return $scope.name;
	}
});