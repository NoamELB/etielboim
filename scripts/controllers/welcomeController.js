/* ==========================================================================
	Welcome Controller is responsible for animating the first page.
	First it shows the second line, then it shows the image and at the end,
	 it redirects the user to the first page.
   =========================================================================*/    
(function(angular){
	'use strict';
	angular.module('welcomeController', [])
	.controller('WelcomeController', ['$scope', '$timeout', '$location', function($scope, $timeout, $location) {
		$scope.secondLine = false;
		$scope.img = false;
		
		// show second line after x seconds
		$timeout(function() {
			$scope.secondLine = true;
		}, 1500);

		// show image after x seconds
		$timeout(function() {
			$scope.img = true;
		}, 2500);

	 	// redirect the web to page 1 after x seconds
		$timeout(function() {
			console.log($location.path());
			if ($location.path() == '/')
				$location.path('/book1');
		}, 5000);
	}]);
})(angular);
