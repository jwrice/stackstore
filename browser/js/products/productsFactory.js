app.factory('ProductsFactory', function($http) {
  return {
    getProducts: function() {
      return $http.get('/api/products/')
        .then(function(res) {
          return res.data;
        })
    },
    getProduct: function(id) {
      return $http.get('/api/products/' + id)
        .then(function(res) {
          return res.data;
        })
    },
    addProduct: function(user, product){
      // console.log('user.cart before adding the push', user.cart)
      user.cart.push(product._id)
      return $http.put('/api/users/'+user._id, user)
      .then(function(response){
        // console.log('user after update in routes', response.data)
        return response.data
      })
    },
    getInstructorProducts: function(instructorId) {
      return $http.get('/api/products/instructorProducts/' + instructorId)
        .then(function(res) {
          return res.data;
        })
    }
  }
})