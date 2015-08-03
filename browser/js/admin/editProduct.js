app.config(function($stateProvider)){
	$stateProvider
	.state('editProduct', {
		url: '/admin/editproduct/:productId',
		templateUrl: 'js/admin/editProduct.html',
		controller: 'editProductCtrl'
	})
}

app.controller('editProductCtrl', function($scope,$http,$stateParams){
	$scope.updatedProduct = {
		title: null,
		serviceDescription: null,
		price: null,
		timeAvailable: null
	}
	$scope.submit = function(){
		$http.put('/api/products/'+$stateParams.productId, $scope.updatedProduct)
		.then(success(){
			$scope.updatedProduct = {
				title: null,
				serviceDescription: null,
				price: null,
				timeAvailable: null
			}
		})
	}
})