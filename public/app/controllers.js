var app = angular.module('app', []);

/* Sidebar Controller */
app.controller('main', function($scope) { 
    $scope.src = "/app/overview.html";
});

/* Overview Controller */
app.controller('overview', function($scope, $http) { 
<<<<<<< HEAD
    $scope.report = {};
=======
    $scope.report = []; 
<<<<<<< HEAD
    $scope.keys = ["Clicks", "Impressions", "CTR", "CPM", "Budget USD", "Cost USD", "Start Date", "End Date", "Created Date"];
>>>>>>> 805fc47311d444675c1b71cf2938fd8ec94ce1ba
=======
    $scope.keys = ["clicks", "impressions", "ctr", "cpm", "budget_USD", "cost_USD", "start_date", "end_date", "created_date"];
>>>>>>> 1a6332b1b2f812614bc889abc5bcf660f82d79ed
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
<<<<<<< HEAD
<<<<<<< HEAD
            var report = response.data.results;
            console.log(report);




            $scope.num = report.length;
=======
        	console.log(response.data.results[0]);

			$scope.report.push(response.data.results[0].clicks);
			$scope.report.push(response.data.results[0].impressions);
			$scope.report.push(response.data.results[0].ctr);
			$scope.report.push(response.data.results[0].cpm);
			$scope.report.push(response.data.results[0].budget_USD);
			$scope.report.push(response.data.results[0].cost);
			$scope.report.push(response.data.results[0].start_date);
			$scope.report.push(response.data.results[0].end_date);
			$scope.report.push(response.data.results[0].created_date);

            //$scope.report = response.data.results[0];
>>>>>>> 805fc47311d444675c1b71cf2938fd8ec94ce1ba
            $scope.overview_ready = true;
            $(window).resize();
        }, 
=======
            $scope.report = response.data.results[0];
            $scope.overview_ready = true;
        },
>>>>>>> 1a6332b1b2f812614bc889abc5bcf660f82d79ed
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
