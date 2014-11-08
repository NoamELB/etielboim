'use strict';
var siteControllers = angular.module('siteControllers', ['ngAnimate', 'ui.bootstrap', 'monospaced.mousewheel']);

var hasNoModal = true; // global variable, determines if there is a modal opened or not

/* ==========================================================================
	Width Controller handles the Size of the screen and determines when 
		it's time to switch to Phone version.
	How it works:
		Whenever the web is resized, the controller will determine if
		 the width is small enough to fit a phone.
   =========================================================================*/
siteControllers.controller('WidthController', ['$scope', '$window', '$timeout', function($scope, $window, $timeout) {
	var widthForSmall = '850'; // minimum computer display
	$scope.barDisplay = false;
	$scope.isSmall = $window.innerWidth < widthForSmall;

	// watch width in order to switch between phone and computer display
	$(window).resize(function(){ 
		$scope.$apply(function() {
			$scope.isSmall = ($window.innerWidth < widthForSmall);
		});
	});
	//Toggles bar for the small version
	$scope.toggleBar = function() {
		$scope.barDisplay = !$scope.barDisplay;
	};
	// returns if bar was clicked or not
	$scope.getBarClass = function() {
		return $scope.barDisplay;
	};

/* ==========================================================================
	Main Controller handles the relocation of the website.
	How it works:
		The controller watches for URL changes. once it sees one, it
		 switches the CSS and tabs accordingly.
		It also captures any wheel-scroll / up or down / END or HOME clicks,
		 and relocates the URL to that direction.
		*will close all modals when relocating.
   =========================================================================*/
}]).controller('MainController', ['$scope', '$location', '$timeout', '$modal', '$modalStack', '$window', function ($scope, $location, $timeout, $modal, $modalStack, $window) {
	// initialize
	$scope.ableToScroll = true; // needed for the delay of scrolling
	$scope.direction = 'down'; // direction to scroll
	$scope.tab = 0; // current tab 
	$scope.pages = ['', '/book1', '/book2', '/book3', '/more', '/about'] // list of the pages in the web

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
			controller: 'modalController',
			windowClass: 'modalClass' // the class of the modal window
		});
	};

/* ==========================================================================
	Modal Controller simply lets the window know when the modal has closed.
	This is important, since the scroll-ability is disabled when the modal
	 is open.
   =========================================================================*/
}]).controller('modalController', ['$modalInstance', '$window', function($modalInstance, $window) {
	// let window know when modal is closed, so can scroll again
	$modalInstance.result.then(function () {}, function () { // function 1 is when success - don't have it here. 2 is when failed/closed
    	$window.hasNoModal = true;
    });

/* ==========================================================================
	Welcome Controller is responsible for animating the first page.
	First it shows the second line, then it shows the image and at the end,
	 it redirects the user to the first page.
   =========================================================================*/    
}]).controller('welcomeController', ['$scope', '$timeout', '$location', function($scope, $timeout, $location) {
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
		$location.path($scope.pages[1]);
	}, 5000);

/* ==========================================================================
	Book2 Controller takes care of switching the images of 3 books, 
	 with animations.
	How it works:
		Each image has ng-show, and every x seconds the $scope.image 
		 variable increases.
   =========================================================================*/
}]).controller('book2Controller', ['$scope', '$interval', '$timeout', function($scope, $interval, $timeout) {
	$scope.showAnimate = false;
	$scope.image = 3; // first image to show

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
		if (++$scope.image > 3) // increase image, then check if it is 4. if it is, make it 1
			$scope.image = 1;
	}, 3500);

/* ==========================================================================
	About Controller has two HTML templates, used for the tooltips.
	How it works:
		Each tooltip activates a function once it is clicked.
		The function disables the other tooltip.
		The result is a tooltip that is triggered by click, but clicking
		 the other tooltip disables the latter.
   =========================================================================*/
}]).controller('aboutController', ['$scope', function($scope) {
	// hides other tooltip when showing this
	$scope.showConnect = function() { 
		$scope.connect = '<p class="rtl">ניתן לתאם "מפגש עם סופרת" או להזמין הצגות:<br>'
		+ 				 '<a target="_blank" href="mailto:shlomielboim@walla.com">shlomielboim@walla.com</a><p>';
		$scope.about = '';
	};
	// hides other tooltip when showing this
	$scope.showAbout = function() { 
		$scope.connect = '';
		$scope.about = '<p class="rtl">האתר נוצר על ידי: <br>'
		+ '<a popover="hi" popover-trigger="mouseenter" target="_blank" href="https://www.linkedin.com/pub/tzook-shaked/a4/230/6a0">צוק שקד</a>'
		+ ' ו<a target="_blank" href="https://www.linkedin.com/pub/noam-elboim/a6/372/a">נעם אלבוים</a>.<br>'
		+ '<a target="_blank" href="mailto:tzook10@gmail.com">tzook10@gmail.com</a><br>'
		+ '<a target="_blank" href="mailto:noam@mail.com">noam@mail.com</a><br>'
		+'<a target="_blank" href="">לקבצי מקור</a></p>';
	};
}]);
