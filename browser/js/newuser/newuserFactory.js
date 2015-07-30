app.factory('NewUserFactory', function ($http) {
	return {
		sendNewUser: function(newUser) {

			return $http.post('/api/users', newUser)
			.then(function (user){
				console.log('factory function response is:', user)
				return user
			}, function(err){
				console.log('factory function response is:', err)
			})
		}
	}
})