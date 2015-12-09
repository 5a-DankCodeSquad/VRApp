var app = angular.module('app', []);

/* Sidebar Controller */
app.controller('main', function($scope) { 
    $scope.src = "/app/overview.html";
});

/* Overview Controller */
/*
    This controller accumulates all of the necessary data to display to the table. The
    needed variables are shown in the $scope.keys array.
*/
app.controller('overview', function($scope, $http) {
    $scope.report = []; 
    $scope.keys = ["clicks", "impressions", "ctr", "cpm", "budget_USD", "cost_USD", "start_date", "end_date", "created_date"];
    $scope.overview_ready = false;
    
    // Makes an API call to AdRoll to retrieve the campaign that the authenticated user owns.
    $http.get('/api/reports?report_type=campaign').then(
        function(response) { 
            $scope.report = response.data.results[0];   // Populates all of the aforementioend variables into the report array.
            $scope.overview_ready = true;               // Changes the overview_ready variable to true to remove the 'Loading' screen.
        },
        function(response) {
            if(response.status = 403) {             // If the browser returns a 403 error, return to the login screen.
                window.location.href = '/login';
            } 
        } 
    );
});

/* CTR Controller */
/*
    Similar functionality to the 'bar' controller. Gathers all the necessary variables
    needed for the line charts.
*/
app.controller('ctr', function($scope, $http) {

        // Uses a variable, n, and creates a series of arrays for each necessary variable. These
        // Variable includes clicks, impressions, and ctr, which are individually displayed in a line chart.
        $scope.n = 0;
        $scope.clicks = [];
        $scope.impressions = [];
        $scope.ctr = [];
        $scope.report = {};
        $scope.report_ready = false;    // Indicator to display/hide the 'Loading' gif.

        // API call to retrieve a report of type ctr that also yields the number of clicks, impressions, and ctr.
        $http.get('/api/reports?report_type=ctr').then(
        function(response) {
            var report = response.data.results;

            // Populates the aforementioned arrays with the number of clicks, impressions, and ctr, respectively.
            for (var day in report) {
                $scope.clicks.push(report[day].clicks);
                $scope.impressions.push(report[day].impressions);
                $scope.ctr.push(report[day].ctr);
            }
            // Measures the length of all the elements in the report and also sets the report_ready variable to true to hide the 'Loading' gif.
            $scope.n = report.length;
            $scope.report_ready = true;
            $(window).resize();
        }, 
        function(response) {                // If there has been an unknown error, return to the login screen.
            if(response.status = 403) {
                window.location.href = '/login';
            } 
        } 
    );
});

/* Bar Controller */
/*
    This is the content that the bar.html file will be accessing in order to get 3
    primary variables for populating the bar graph. These 3 variables are 'cpc', 'cpm',
    and 'ctr'.
*/
app.controller('bar', function($scope, $http) {

    $scope.n = 0;           // Measures how many records of data were retrieved.
    $scope.cpc = [];        // Stores all the cpc variables from the JSON object in an array.
    $scope.cpm = [];        // Stores all the cpm variables from the JSON object in an array.
    $scope.ctr = [];        // Stores all the ctr variables from the JSON object in an array.
    $scope.report = {};
    $scope.report_ready = false;    // Sets to true when data is finished loading to remove the 'loading' gif.

    // Calls the necessary API command to retrieve the necessary variables from AdRoll.
    $http.get('/api/reports?report_type=ctr').then(
        function(response) {
            var report = response.data.results;

            // Puts all data elements into the cpc, cpm, and ctr array, respectively.
            for (var day in report) {
                $scope.cpc.push(report[day].cpc);
                $scope.cpm.push(report[day].cpm);
                $scope.ctr.push(report[day].ctr);

            }
            // Measures the length of the report in terms of data elements and changes report_ready to true.
            $scope.n = report.length;
            $scope.report_ready = true;
            $(window).resize();
        },
        function(response) {            // If there is an error, return to the login screen and throw a 403 error.
            if(response.status = 403) {
                window.location.href = '/login';
            }
        }
    );
});