app.factory('ProfileFactory', function ($http) {
	return {
		editAttribute: function(element) {
			return $http.post('/')
					.then(function(res){
						return res.data;
					})
		}
	}
})