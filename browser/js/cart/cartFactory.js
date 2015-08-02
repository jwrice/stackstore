app.factory('CartFactory', function ($http, AuthService) {
	return {
		getCart: function(userId) {
			return $http.get('/api/users/'+userId)
			.then(function (response){
				return response.data
			})
		},

		getUser: function(){
			return AuthService.getLoggedInUser().then(function(response){
				return response
			})
		},

		addProduct: function(user, product){
			user.cart.push(product._id)
			return $http.put('/api/users/'+user._id, user)
			.then(function(response){
				return response.data
			})
		},

		buyProduct: function(user, product){
			// (db) push to transaction
			var user = user;
			return $http.post('api/transaction/'+user._id, product)
			.then(function(res){
				return res.data
			})
			.then(function(transaction) {
				console.log('transaction', transaction)
				user.pastPurchases.push(transaction)
				user.cart = user.cart.filter(function(cartObj){
					return cartObj._id !== transaction.product
        		})
				return user;
			})
			// (local) remove from user.cart locally
			// (db) remove from user cart
			// $http.remove
		},

		updateUser: function(user){
			// (db) push to transaction

			return $http.put('api/users/'+user._id, user)
			.then(function(res){
				return res.data
			})
		}

	}
})