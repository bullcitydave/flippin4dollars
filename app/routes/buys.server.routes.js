'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users'),
	buys = require('../../app/controllers/buys');

module.exports = function(app) {
	// Buy Routes
	app.route('/buys')
		.get(buys.list)
		.post(users.requiresLogin, buys.create);

	app.route('/buys/:buyId')
		.get(buys.read)
		.put(users.requiresLogin, buys.hasAuthorization, buys.update)
	    .delete(users.requiresLogin, buys.hasAuthorization, buys.delete);

	// Finish by binding the buy middleware
	app.param('buyId', buys.buyByID);
};
