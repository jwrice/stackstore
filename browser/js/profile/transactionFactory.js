app.factory("TransactionFactory", function($http) {
  return {
    makeRating: function(transactionId, rating) {
      return $http.put("/api/transaction/" + transactionId, {
          number: rating
        })
        .then(function(res) {
          return res.data;
        })
    }
  }
})