app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html'
    });
});

app.controller('slidesCtrl', function($scope){
	$scope.slides = [
	{image: '../../imgs/joe_alves.jpg', name: "Joe"},
	{image: '../../imgs/omri_bernstein.jpg', name: "Omri"},
	{image: '../../imgs/zeke_nierenberg.jpg', name:"Zeke"},
	{image: '../../imgs/scott_dalessandro.jpg', name:"Scott"},
	{image: '../../imgs/gabriel_lebec.jpg', name:"Gabriel"},
	];

})

app.directive('slider', function($timeout){
	return {
		restrict: 'AE',
		replace: true,
		scope: {
			images: '='
		},
		link: function(scope, elem, sttrs){
			scope.currentIndex = 0; // Initially the index is at the first image
 
			scope.next = function() {
			  scope.currentIndex < scope.images.length - 1 ? scope.currentIndex++ : scope.currentIndex = 0;
			};
			 
			scope.prev = function() {
			  scope.currentIndex > 0 ? scope.currentIndex-- : scope.currentIndex = scope.images.length - 1;
			};
			scope.$watch('currentIndex', function() {
				scope.images.forEach(function(image) {
				image.visible = false; // make every image invisible
				});
				 
				scope.images[scope.currentIndex].visible = true; // make the current image visible
			});
			var timer;
			var sliderFunc = function() {
			  timer = $timeout(function() {
			    scope.next();
			    timer = $timeout(sliderFunc, 2000);
			  }, 2000);
			};
			 
			sliderFunc();
			 
			scope.$on('$destroy', function() {
			  $timeout.cancel(timer); // when the scope is getting destroyed, cancel the timer
			});
		},
		templateUrl:'js/home/slider.html'
	}
})