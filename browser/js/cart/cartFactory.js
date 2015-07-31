app.factory('CartFactory', function ($http, AuthService) {
	return {
		getCart: function(userId) {
			return $http.get('/api/users/'+userId)
			.then(function (response){
				console.log(response)
				console.log('user cart is:', response.data.cart)
				return response.data.cart
			})
		},

		getUser: function(){
			return AuthService.getLoggedInUser().then(function(response){
				console.log(response)
				return response
			})
		},

		addProduct: function(user, product){
			user.cart.push(product._id)
			console.log('USER', user, 'PRODUCT', product)
			return $http.put('/api/users/'+user._id, user)
			.then(function(response){
				console.log(response)
				return response.data
			})
		}
	}
})