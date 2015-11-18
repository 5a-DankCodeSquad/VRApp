  angular.module('app', []).controller('master', function($scope, $http) {
    

    $scope.reportSrc = '/app/campaignReport.html';

    $scope.changeSrc = function(src){
      $scope.reportSrc = src;
    }
    
    $scope.report = [];
    $scope.overview_ready = false;
    console.log("A");

    $http.get('/api/reports?report_type=campaign')
    .then(
      function(response) {
      	$scope.report = response.data.results[0];
        $scope.overview_ready = true;
      },
      function(response) {
        if(response.status = 403) {
          console.log(response);
          $location.path('/login');
        }
      }
    );

    
  });