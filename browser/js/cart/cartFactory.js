app.factory('CartFactory', function ($http) {
	return {
		getCart: function(userId) {
			return $http.get('/api/users/'+userId)
			.then(function (response){
				console.log('user cart is:', response.data.cart)
				return response.data.cart
			})
		}
	}
})