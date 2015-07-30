app.factory('ProductsFactory', function ($http) {
	return {
		getProducts: function() {
			return $http.get('/api/products/')
					.then(function(res){
						return res.data;
					})
		}
	}
})