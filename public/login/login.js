var app = angular.module('app', []);

app.controller('loginCtrl', function($scope, $http, $window) {
    
    $scope.show_error_message = false;
	$scope.error_message = "";
	$scope.email = "";
	$scope.password = "";

	$scope.signin = function() {
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