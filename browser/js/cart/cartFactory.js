app.factory('CartFactory', function ($http) {
	return {
		getUser: function(userId) {
			return $http.get('/api/users/'+userId)
			.then(function (response){
				console.log('user cart is:', response.data.cart)
				return response.data
			})
		},

		editUser: function(user) {
			return $http.put('/api/users/'+user._id, user)
			.then(function (response){
				console.log('edited User is:', response.data)
				return response.data
			})
		}
	}
});