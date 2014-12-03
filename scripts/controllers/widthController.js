/* ==========================================================================
	Width Controller handles the Size of the screen and determines when 
		it's time to switch to Phone version.
	How it works:
		Whenever the web is resized, the controller will determine if
		 the width is small enough to fit a phone.
   =========================================================================*/
(function(angular){
	'use strict';
	angular.module('widthController', [])
	.controller('WidthController', ['$scope', '$window', '$interval', function($scope, $window, $interval) {
		var widthForSmall = '850'; // minimum computer display
		$scope.barDisplay = false;
		$scope.isSmall = $window.innerWidth < widthForSmall;

		// watch width in order to switch between phone and computer display
		$interval(function() {
			$scope.isSmall = ($window.innerWidth < widthForSmall);
		}, 500);

		//Toggles bar for the small version
		$scope.toggleBar = function() {
			$scope.barDisplay = !$scope.barDisplay;
		};
		// returns if bar was clicked or not
		$scope.getBarClass = function() {
			return $scope.barDisplay;
		};

	}]);
})(angular);
