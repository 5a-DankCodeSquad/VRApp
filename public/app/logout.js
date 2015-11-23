var app = angular.module('app', []);

app.controller('loginCtrl', function() {
    
    
	$scope.signin = function() {
        $http.get('/api/Logins')
	
	};
});