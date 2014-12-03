/* ==========================================================================
	Main Controller handles the relocation of the website.
	How it works:
		The controller watches for URL changes. once it sees one, it
		 switches the CSS and tabs accordingly.
		It also captures any wheel-scroll / up or down / END or HOME clicks,
		 and relocates the URL to that direction.
		*will close all modals when relocating.
   =========================================================================*/
(function(angular){
	'use strict';
	angular.module('mainController', [])
	.controller('MainController', ['$scope', '$location', '$timeout', '$modal', '$modalStack', '$window', function ($scope, $location, $timeout, $modal, $modalStack, $window) {
		// initialize
		$scope.ableToScroll = true; // needed for the delay of scrolling
		$scope.direction = 'down'; // direction to scroll
		$scope.tab = 0; // current tab 
		$scope.pages = ['', '/book1', '/book2', '/book3', '/more', '/about'] // list of the pages in the web
		$window.hasNoModal = true; // global variable, determines if there is a modal opened or not

		// gets mousewheel events, and scrolls between partials accordingly
		$scope.wheel = function(event, delta, deltaX, deltaY){ 
			if ($window.hasNoModal) { // only apply if there are no modals
				event.preventDefault(); // no scrolling the page itself
				$scope.setPartial(deltaY);
			}
		};

		// relocates the page, once the cooldown is set
		$scope.setPartial = function(direction) { 
			if ($scope.ableToScroll)
				$scope.relocate(direction);
		};

		// switch partials according to scrolling / up or down / home or end
		$scope.relocate = function(direction) {
			if (!$window.hasNoModal) // modal is open - dont relocate page
				return;
			var loc = '';
			switch (direction) {
				case -1: if ($scope.tab === $scope.pages.length - 1) // at bottom
							return;
						loc = $scope.pages[$scope.tab + 1]; // move down one page
						break;
				case 1: if ($scope.tab < 2) // at top
							return;
						loc = $scope.pages[$scope.tab - 1];
						break;
				case 3: if ($scope.tab < 2) // pressed HOME
							return;
						loc = $scope.pages[1];
						break;
				case 4: if ($scope.tab === $scope.pages.length - 1) // pressed END
							return;
						loc = $scope.pages[$scope.pages.length - 1];
						break;
				default: return;
			}
			$location.path(loc); // relocate to the partial: loc

			$scope.ableToScroll = false; // limit scroll-ability
			$timeout(function() { // enable scrolling again after 0.8s
				$scope.ableToScroll = true;
			}, 800);
		};

		//  returns if newTab is the current tab.
		$scope.isSelected = function(newTab) {
		    return $scope.tab === newTab;
	 	};
		
		// sets the current tab according to the URL.
		$scope.setMainTab = function() {
			var newTab;
			switch($location.path()) {
				case $scope.pages[1]: 		newTab = 1;
											break;
				case $scope.pages[2]: 		newTab = 2;
											break;
				case $scope.pages[3]: 		newTab = 3;
											break;
				case $scope.pages[4]: 		newTab = 4;
											break;
				case $scope.pages[5]: 		newTab = 5;
											break;
				default: 					newTab = 0;
											break;
			}
			$scope.tab = newTab;
		};

		// updates the main tab whenever the URL changes
		$scope.$watch(function() {
		    return $location.path(); // the '/123' after #/123 of URL
		 }, function(){
		 	$modalStack.dismissAll(); // close all open modals
		 	var oldTab = $scope.tab; // the tab before the change
		 	$scope.setMainTab(); // change the tab according to new path
			$scope.direction = (oldTab > $scope.tab ? 'up' : 'down'); // checks the direction of the scrolling
		 });

		// opens a modal and lets the window know a modal is open, in order to disable scrolling
		$scope.open = function(book) {
			$window.hasNoModal = false; // disable the page scroll until the modal is closed
			$modal.open({
				templateUrl: 'partials/first-page-' + book +'.html',
				controller: 'ModalController',
				windowClass: 'modalClass' // the class of the modal window
			});
		};
	}]);
})(angular);
