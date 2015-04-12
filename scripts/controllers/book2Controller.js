/* ==========================================================================
	Book2 Controller takes care of switching the images of 3 books, 
	 with animations.
	How it works:
		Each image has ng-show, and every x seconds the $scope.image 
		 variable increases.
=========================================================================*/
(function(angular){
	'use strict';
	angular.module('book2Controller', [])
	.controller('Book2Controller', ['$scope', '$interval', '$timeout', function($scope, $interval, $timeout) {
		$scope.showAnimate = false;
		$scope.image = 4; // first image to show

		// decide which image to show
		$scope.showImage = function(img) { 
			return $scope.image === img;
		};
		// needed to prevent the animation showing when entering the page
		$timeout(function() { 
			$scope.showAnimate = true;
		}, 1);
		// switch the pictures every x seconds
		$interval(function() { 
			if (++$scope.image > 4) // increase image, then check if it is 5. if it is, make it 1
				$scope.image = 1;
		}, 3500);

	}]);
})(angular);
