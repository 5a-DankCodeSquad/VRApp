var app = angular.module('app', []);

/* Sidebar Controller */
app.controller('main', function($scope) { 
    $scope.src = "overview.html";
});

/* Overview Controller */
app.controller('overview', function($scope, $http) { 
    $scope.report = []; 
    $scope.overview_ready = false;
    
    $http.get('/api/reports?report_type=campaign').then(
        function(response) { 
            $scope.report = response.data.results[0];
            $scope.overview_ready = true;
        }, 
        function(response) {
            if(response.status = 403) {
                $location.path('/login');
            } 
        } 
    ); 
});
