var app = angular.module('app', []);

/* Sidebar Controller */
app.controller('main', function($scope) { 
    $scope.src = "overview.html";
});

/* Overview Controller */
app.controller('overview', function($scope, $http) { 
    $scope.report = []; 
    $scope.keys = ["Clicks", "Impressions", "CTR", "CPM", "Budget USD", "Cost USD", "Start Date", "End Date", "Created Date"];
    $scope.overview_ready = false;
    
    $http.get('/api/reports?report_type=campaign').then(
        function(response) { 
        	console.log(response.data.results[0]);
            //Adding necesary data and checking if null
            if(response.data.results[0].clicks != null)
                $scope.report.push(response.data.results[0].clicks);
            else
                $scope.report.push("N/A");
            if(response.data.results[0].impressions != null)
                $scope.report.push(response.data.results[0].impressions);
            else
                $scope.report.push("N/A");
            if(response.data.results[0].ctr != null)
                $scope.report.push(response.data.results[0].ctr);
            else
                $scope.report.push("N/A");
            if(response.data.results[0].cpm != null)
                $scope.report.push(response.data.results[0].cpm);
            else
                $scope.report.push("N/A");
            if(response.data.results[0].budget_USD != null)
                $scope.report.push(response.data.results[0].budget_USD);
            else
                $scope.report.push("N/A");
            if(response.data.results[0].cost != null)
                $scope.report.push(response.data.results[0].cost);
            else
                $scope.report.push("N/A");
            if(response.data.results[0].start_date != null)
                $scope.report.push(response.data.results[0].start_date);
            else
                $scope.report.push("N/A");
            if(response.data.results[0].end_date != null)
            $scope.report.push(response.data.results[0].end_date);
            else
                $scope.report.push("N/A");
            if(response.data.results[0].created_date != null)
                $scope.report.push(response.data.results[0].created_date);
            else
                $scope.report.push("N/A");

            //$scope.report = response.data.results[0];
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
