'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Buy = mongoose.model('Buy'),
	_ = require('lodash');

/**
 * Get the error message from error object
 */
var getErrorMessage = function(err) {
	var message = '';

	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Buy already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	return message;
};

/**
 * Create a buy
 */
exports.create = function(req, res) {
	var buy = new Buy(req.body);
	buy.user = req.user;

	buy.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(buy);
		}
	});
};

/**
 * Show the current buy
 */
exports.read = function(req, res) {
	res.jsonp(req.buy);
};

/**
 * Update a buy
 */
exports.update = function(req, res) {
	var buy = req.buy;

	buy = _.extend(buy, req.body);

	buy.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(buy);
		}
	});
};

/**
 * Delete an buy
 */
exports.delete = function(req, res) {
	var buy = req.buy;

	buy.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(buy);
		}
	});
};

/**
 * List of Buys
 */
exports.list = function(req, res) {
	Buy.find().sort('-created').populate('user', 'displayName').exec(function(err, buys) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(buys);
		}
	});
};

/**
 * Buy middleware
 */
exports.buyByID = function(req, res, next, id) {
	Buy.findById(id).populate('user', 'displayName').exec(function(err, buy) {
		if (err) return next(err);
		if (!buy) return next(new Error('Failed to load buy ' + id));
		req.buy = buy;
		next();
	});
};

/**
 * Buy authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.buy.user.id !== req.user.id) {
		return res.send(403, {
			message: 'User is not authorized'
		});
	}
	next();
};
