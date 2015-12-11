var app = angular.module('app', []);

//Checks if email/password sign in combo is in the the database to proceed to main page, else return error
app.controller('loginCtrl', function($scope, $http, $window) {
    
    $scope.show_error_message = false;
	$scope.error_message = "";
	$scope.email = "";
	$scope.password = "";

	$scope.signin = function() {
	//api call to check email and password
        $http.post('/api/Logins', {user: $scope.email, password:$scope.password})
		.then(
			function(response) {
				$window.location.href = '/';
			},
            function(response) {
		        $scope.show_error_message = true;
				$scope.error_message = response.data;
            }
		);

	};
});
