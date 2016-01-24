'use strict';

// Setting up route
angular.module('buys').config(['$stateProvider',
	function($stateProvider) {
		// Buys state routing
		$stateProvider.
		state('listBuys', {
			url: '/buys',
			templateUrl: 'modules/buys/views/list-buys.client.view.html'
		}).
		state('createBuy', {
			url: '/buys/create',
			templateUrl: 'modules/buys/views/create-buy.client.view.html'
		}).
		state('viewBuy', {
			url: '/buys/:buyId',
			templateUrl: 'modules/buys/views/view-buy.client.view.html'
		}).
		state('editBuy', {
			url: '/buys/:buyId/edit',
			templateUrl: 'modules/buys/views/edit-buy.client.view.html'
		});
	}
]);
