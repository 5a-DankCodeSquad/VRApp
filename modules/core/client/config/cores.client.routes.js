'use strict';

//Setting up route
angular.module('cores').config(['$stateProvider',
	function($stateProvider) {
		// Cores state routing
		$stateProvider.
		state('cores', {
			abstract: true,
			url: '/cores',
			template: '<ui-view/>'
		}).
		state('cores.list', {
			url: '',
			templateUrl: 'modules/cores/views/list-cores.client.view.html'
		}).
		state('cores.create', {
			url: '/create',
			templateUrl: 'modules/cores/views/create-core.client.view.html'
		}).
		state('cores.view', {
			url: '/:coreId',
			templateUrl: 'modules/cores/views/view-core.client.view.html'
		}).
		state('cores.edit', {
			url: '/:coreId/edit',
			templateUrl: 'modules/cores/views/edit-core.client.view.html'
		});
	}
]);