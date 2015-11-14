  angular.module('app', []).controller('master', function($scope, $http) {
    

    $scope.reportSrc = '/app/campaignReport.html';

    $scope.changeSrc = function(src){
      $scope.reportSrc = src;
    }
    
  });