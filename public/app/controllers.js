var app = angular.module('app', []);

/* Sidebar Controller */
app.controller('main', function($scope) { 
    $scope.src = "/app/overview.html";
});

/* Overview Controller */
app.controller('overview', function($scope, $http) { 
    $scope.report = []; 
    $scope.keys = ["clicks", "impressions", "ctr", "cpm", "budget_USD", "cost_USD", "start_date", "end_date", "created_date"];
    $scope.overview_ready = false;
    
    $http.get('/api/reports?report_type=campaign').then(
        function(response) { 
            $scope.report = response.data.results[0];
            $scope.overview_ready = true;
        },
        function(response) {
            if(response.status = 403) {
                window.location.href = '/login';
            } 
        } 
    );
});

/* CTR Controller */
app.controller('ctr', function($scope, $http) {

        $scope.n = 0;
        $scope.clicks = [];
        $scope.impressions = [];
        $scope.ctr = [];
        $scope.report = {};
        $scope.report_ready = false;

        $http.get('/api/reports?report_type=ctr').then(
        function(response) {
            var report = response.data.results;

            for (var day in report) {
                $scope.clicks.push(report[day].clicks);
                $scope.impressions.push(report[day].impressions);
                $scope.ctr.push(report[day].ctr);
            }
 
            $scope.n = report.length;
            $scope.report_ready = true;
            $(window).resize();
        }, 
        function(response) {
            if(response.status = 403) {
                window.location.href = '/login';
            } 
        } 
    );
});

/* Bar Controller */
app.controller('bar', function($scope, $http) {

    $scope.n = 0;
    $scope.cpc = [];
    $scope.cpm = [];
    $scope.ctr = [];
    $scope.report = {};
    $scope.report_ready = false;

    $http.get('/api/reports?report_type=ctr').then(
        function(response) {
            var report = response.data.results;

            for (var day in report) {
                $scope.cpc.push(report[day].cpc);
                $scope.cpm.push(report[day].cpm);
                $scope.ctr.push(report[day].ctr);

            }

            $scope.n = report.length;
            $scope.report_ready = true;
            $(window).resize();
        },
        function(response) {
            if(response.status = 403) {
                window.location.href = '/login';
            }
        }
    );
});
