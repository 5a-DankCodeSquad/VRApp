"use strict";

var myLogin = angular.module('app', []);

myLogin.controller('loginCtrl',function($scope) {
	$scope.isUp = false;
	$scope.signUp = function() {
		$scope.isUp = true;
	};

	$scope.isSignUp = function() {
		if($scope.isUp === true)
		{
			return $scope.isUp;
		}
	};

	$scope.signIn = function($scope, $http) {
		$scope.isUp = false;
		//$http.post;
	};
});