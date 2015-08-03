app.config(function($stateProvider) {
    $stateProvider
        .state('instructor', {
            url: '/instructor',
            templateUrl: 'js/instructor/instructors.html',
            controller: 'InstructorCtrl'
        })
        .state('singleInstructor', {
            url: '/instructor/:instructorId',
            templateUrl: 'js/instructor/oneInstructor.html',
            controller: 'InstructorOneCtrl'
        });
});

app.controller('InstructorCtrl', function($scope, $state, InstructorFactory) {
    InstructorFactory.getInstructors().then(function(res) {
        // console.log(res)
        $scope.instructors = res
            //sorting by stars
        $scope.instructors = $scope.instructors.sort(function(first, second) {
            return first.rating - second.rating;
        })
        $scope.instructors.reverse();
    })

    $scope.arrowDir = "down"
    var arrowDirs = ["up", "down"]
    $scope.toggleArrow = function() {
        $scope.instructors.reverse();
        var nextIndex = (arrowDirs.indexOf($scope.arrowDir) + 1) % 2;
        $scope.arrowDir = arrowDirs[nextIndex];
    }
})


app.controller('InstructorOneCtrl', function($scope, $state, InstructorFactory, ProductsFactory, $stateParams) {

    InstructorFactory.getOneInstructor($stateParams.instructorId)
        .then(function(instructor) {
            $scope.instructor = instructor;
        })

    ProductsFactory.getInstructorProducts($stateParams.instructorId)
        .then(function(products) {
            $scope.products = products;
        })

})