'use strict';

// Configuring the Buys module
angular.module('buys').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Buys', 'buys');
		Menus.addMenuItem('topbar', 'New Buy', 'buys/create');
	}
]);
