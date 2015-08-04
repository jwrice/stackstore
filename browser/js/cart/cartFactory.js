app.factory('CartFactory', function($http, AuthService) {
	return {

		buyProduct: function(user, product) {
			// (db) push to transaction
			console.log('product', product, 'user', user)
			var user = user;
			return $http.post('api/transaction/' + user._id, product)
				.then(function(res) {
					return res.data
				})
				.then(function(transaction) {
					console.log('transaction', transaction)
					user.pastPurchases.push(transaction)
					user.cart = user.cart.filter(function(cartObj) {
						return cartObj._id !== transaction.product
					})
					return user;
				})

		},

		buyAllProducts: function(user) {
			// return user.cart.forEach($http.post('/api/transaction/'+user._id, product)
		},

		updateUser: function(user) {
			// (db) push to transaction

			return $http.put('api/users/' + user._id, user)
				.then(function(res) {
					return res.data
				})
		}

	}
})