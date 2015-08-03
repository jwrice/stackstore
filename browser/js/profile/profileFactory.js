app.factory('ProfileFactory', function ($http) {
	return {
		editAttribute: function(element) {
			return $http.post('/')
					.then(function(res){
						return res.data;
					})
		},
		getUser: function(user) {
			return $http.get('/api/users/' + user._id)
					.then(function(res) {
					console.log(res.data)
						return res.data;
					})
    	}
	}
})