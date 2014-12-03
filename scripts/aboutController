/* ==========================================================================
	About Controller has two HTML templates, used for the tooltips.
	How it works:
		Each tooltip activates a function once it is clicked.
		The function disables the other tooltip.
		The result is a tooltip that is triggered by click, but clicking
		 the other tooltip disables the latter.
   =========================================================================*/
(function(angular){
	'use strict';
	angular.module('aboutController', [])
	.controller('AboutController', ['$scope', function($scope) {
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
			+'<a target="_blank" href="https://github.com/NoamELB/etielboim">לקבצי מקור</a></p>';
		};
	}]);
})(angular);
