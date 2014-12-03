/* ==========================================================================
	Modal Controller simply lets the window know when the modal has closed.
	This is important, since the scroll-ability is disabled when the modal
	 is open.
   =========================================================================*/
(function(angular){
	'use strict';
	angular.module('modalController', [])
	.controller('ModalController', ['$modalInstance', '$window', function($modalInstance, $window) {
		// let window know when modal is closed, so can scroll again
		$modalInstance.result.then(function () {}, function () { // function 1 is when success - don't have it here. 2 is when failed/closed
	    	$window.hasNoModal = true;
	    });

	}]);
})(angular);
