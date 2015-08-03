
app.config(function($stateProvider){
	$stateProvider
	.state('editProduct', {
		url: '/admin/editproduct/:productId',
		templateUrl: 'js/admin/editProduct.html',
		controller: 'editProductCtrl'
	})

})

app.controller('editProductCtrl', function($scope,$http,$stateParams, $state){
	$http.get('api/products/'+$stateParams.productId).then(function(product){
		$scope.updatedProduct = product.data;
	})
	$scope.submit = function(){
		return $http.put('/api/products/'+$stateParams.productId, $scope.updatedProduct)
		.then(function (){
			$state.go('admin');
		})
	}
})