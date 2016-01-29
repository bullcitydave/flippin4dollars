'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Buy Schema
 */
var BuySchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	purchased: {
		type: Date,
		default: Date.now
	},
	merchant: {
		type: String,
		default: '',
		trim: true
	},
	item: {
		type: String,
		default: '',
		trim: true
	},
	type: {
		type: String,
		default: '',
		trim: true
	},
	retail: {
		type: Number
	},
	paid: {
		type: Number
	},
	netCost: {
		type: Number
	},
	discounts: [{
		nominal : {
			type: Number
		},
		percentage: {
			type: Number
		},
		description : {
			type: String
		}
	}],
	ebay : {
		potentialSale : {
			type : Number
		},
		potentialShippingBuyer : {
			type : Number
		},
		potentialShippingSeller : {
			type : Number
		},
		potentialPaypalFee : {
			type: Number
		},
		potentialListingFee : {
			type: Number
		},
		potentialFVF : {
			type: Number
		},
		netSale : {
			type: Number
		},
		buyerShippingCharge : {
			type: Number
		}
	},
	potentialProfit : {
		type : Number
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Buy', BuySchema);
