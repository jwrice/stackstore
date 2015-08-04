app.config(function($stateProvider) {
	$stateProvider.state('products', {
		url: '/products',
		controller: 'ProductsController',
		templateUrl: 'js/products/products.html'
	});

});

app.controller('ProductsController', function($scope, $rootScope, $state, ProductsFactory, InstructorFactory, CartFactory, $http) {
	// console.log('user.cart', $scope.user.cart)
	$scope.cats = ["Python", "Java", "JavaScript", "Ruby", "Objective-C"];
	$scope.changed = function(category) {
		if (!category) $scope.category = "ALL"
		$scope.category = category;
	}
	ProductsFactory.getProducts().then(function(products) {
		$scope.products = products;
	})

	InstructorFactory.getInstructors().then(function(instr) {
		$scope.instructors = instr;
	})

	$scope.choose = function(ins) {
		if (!ins) $scope.insIds = "ALL"
		$scope.insIds = ins;
	}

	$scope.getUser = function(id) {
		$http.get('api/users/' + id).then(function(user) {
			$scope.name = user.firstName + user.lastName;
		})
		return $scope.name;
	}

	$scope.submit = function(product) {
		console.log('product before', product)
		ProductsFactory.addProduct($scope.user, product)
			.then(function(user) {
				// console.log('user.cart after addProduct', user.cart)  
				return CartFactory.updateUser(user)
			})
			.then(function(user) {
				$scope.user = user;
				$rootScope.user = user;
			})
	}

	$scope.viewProduct = function(id) {
		console.log(id);
		$state.go('oneProduct', {
			id: id
		});
	}

	$scope.insIds = "ALL";
	$scope.category = "ALL";
});

//state and controller for oneProduct page
app.config(function($stateProvider) {
	$stateProvider.state('oneProduct', {
		url: '/products/:id',
		controller: 'OneProductController',
		templateUrl: 'js/products/oneProduct.html'
	});
});

app.controller('OneProductController', function($scope, ProductsFactory, CartFactory, $stateParams) {
	ProductsFactory.getProduct($stateParams.id).then(function(product) {
		$scope.product = product;
		$scope.instructor = product.instructor;
		$scope.time = {
			hours: Math.floor(product.timeAvailable / 60),
			minutes: product.timeAvailable % 60
		}
	})

	$scope.submit = function(product) {
		// console.log('product before', product)
		ProductsFactory.addProduct($scope.user, product)
			.then(function(user) {
				// console.log('user.cart after addProduct', user.cart)  
				return CartFactory.updateUser(user)
			})
			.then(function(user) {
				$scope.user = user;
				$rootScope.user = user;
			})
	}
})