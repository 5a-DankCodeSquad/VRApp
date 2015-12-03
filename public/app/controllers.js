var app = angular.module('app', []);

/* Sidebar Controller */
app.controller('main', function($scope) { 
    $scope.src = "overview.html";
});

/* Overview Controller */
app.controller('overview', function($scope, $http) { 
    $scope.report = {};
    $scope.overview_ready = false;
    $scope.num = 0;
    $scope.campaigns = 0;
    $scope.costUSD = 0;
    $scope.startDate = 0;
    $scope.endDate = 0;
    $scope.budgetUSD = 0;
    $scope.impressions = 0;
    $scope.ctr = 0;
    $scope.cpa = 0;
    $scope.cpm = 0;
    $scope.cpc = 0;
    $scope.createdDate = 0;
    
    $http.get('/api/reports?report_type=campaign').then(
        function(response) { 
            var report = response.data.results;
            console.log(report);




            $scope.num = report.length;
            $scope.overview_ready = true;
            $(window).resize();
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
