'use strict';

// Cores controller
angular.module('cores').controller('CoresController', ['$scope', '$stateParams', '$location', 'Authentication', 'Cores',
	function($scope, $stateParams, $location, Authentication, Cores ) {
		$scope.authentication = Authentication;

		// Create new Core
		$scope.create = function() {
			// Create new Core object
			var core = new Cores ({
				name: this.name
			});

			// Redirect after save
			core.$save(function(response) {
				$location.path('cores/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Core
		$scope.remove = function( core ) {
			if ( core ) { core.$remove();

				for (var i in $scope.cores ) {
					if ($scope.cores [i] === core ) {
						$scope.cores.splice(i, 1);
					}
				}
			} else {
				$scope.core.$remove(function() {
					$location.path('cores');
				});
			}
		};

		// Update existing Core
		$scope.update = function() {
			var core = $scope.core ;

			core.$update(function() {
				$location.path('cores/' + core._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Cores
		$scope.find = function() {
			$scope.cores = Cores.query();
		};

		// Find existing Core
		$scope.findOne = function() {
			$scope.core = Cores.get({ 
				coreId: $stateParams.coreId
			});
		};
	}
]);