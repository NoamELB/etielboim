(funciton(angular){
'use strict';
var myApp = angular.module('myApp', [
	'ngRoute',
	'siteControllers' // controllers
]).directive('titleBar', function() { // makes the entire title-bar in another HTML template
    return {
	  	restrict: 'E',
	  	templateUrl: 'partials/title-bar.html'
    };
}).config(['$routeProvider', function ($routeProvider) {
	$routeProvider.
	when('/', {
		templateUrl: 'partials/welcome.html',
		controller: 'welcomeController'
	}).when('/book1', {
		templateUrl: 'partials/first-book.html'
	}).when('/book2', {
		templateUrl: 'partials/second-book.html',
		controller: 'book2Controller'
	}).when('/book3', {
		templateUrl: 'partials/third-book.html'
	}).when('/more', {
		templateUrl: 'partials/more.html'
	}).when('/about', {
		templateUrl: 'partials/about.html',
		controller: 'aboutController'
	}).otherwise({
		redirectTo: '/book1' // default page - newest book
	});
}]);
})(angular)

