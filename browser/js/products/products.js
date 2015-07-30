app.config(function ($stateProvider) {
    $stateProvider.state('products', {
        url: '/products',
        controller: 'ProductsController',
        templateUrl: 'js/products/products.html'
    });

});

app.controller('ProductsController', function ($scope, ProductsFactory ,InstructorFactory,$http) {
	$scope.cats = ["Python","Java","JavaScript","Ruby","Objective-C"];
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

	$scope.insIds = "ALL";
	$scope.category = "ALL";
});