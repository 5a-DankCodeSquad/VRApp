'use strict';

//Cores service used to communicate Cores REST endpoints
angular.module('cores').factory('Cores', ['$resource',
	function($resource) {
		return $resource('api/cores/:coreId', { coreId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);