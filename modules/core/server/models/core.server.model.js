'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Core Schema
 */
var CoreSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Core name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Core', CoreSchema);