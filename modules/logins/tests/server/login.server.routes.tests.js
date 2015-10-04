'use strict';

var should = require('should'),
	request = require('supertest'),
	path = require('path'),
	express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, login;

/**
 * Login routes tests
 */
describe('Login CRUD tests', function() {
	before(function(done) {

		done();
	});

	beforeEach(function(done) {
	
	});

	it('should be able to save Login instance if logged in', function(done) {
        var user = "gent@demo.com";
        var password = "demo";
	});

	afterEach(function(done) {

	});
});