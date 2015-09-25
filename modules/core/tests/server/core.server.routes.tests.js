'use strict';

var should = require('should'),
	request = require('supertest'),
	path = require('path'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Core = mongoose.model('Core'),
	express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, core;

/**
 * Core routes tests
 */
describe('Core CRUD tests', function() {
	before(function(done) {
		// Get application
		app = express.init(mongoose);
		agent = request.agent(app);

		done();
	});

	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Core
		user.save(function() {
			core = {
				name: 'Core Name'
			};

			done();
		});
	});

	it('should be able to save Core instance if logged in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Core
				agent.post('/api/cores')
					.send(core)
					.expect(200)
					.end(function(coreSaveErr, coreSaveRes) {
						// Handle Core save error
						if (coreSaveErr) done(coreSaveErr);

						// Get a list of Cores
						agent.get('/api/cores')
							.end(function(coresGetErr, coresGetRes) {
								// Handle Core save error
								if (coresGetErr) done(coresGetErr);

								// Get Cores list
								var cores = coresGetRes.body;

								// Set assertions
								(cores[0].user._id).should.equal(userId);
								(cores[0].name).should.match('Core Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Core instance if not logged in', function(done) {
		agent.post('/api/cores')
			.send(core)
			.expect(403)
			.end(function(coreSaveErr, coreSaveRes) {
				// Call the assertion callback
				done(coreSaveErr);
			});
	});

	it('should not be able to save Core instance if no name is provided', function(done) {
		// Invalidate name field
		core.name = '';

		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Core
				agent.post('/api/cores')
					.send(core)
					.expect(400)
					.end(function(coreSaveErr, coreSaveRes) {
						// Set message assertion
						(coreSaveRes.body.message).should.match('Please fill Core name');
						
						// Handle Core save error
						done(coreSaveErr);
					});
			});
	});

	it('should be able to update Core instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Core
				agent.post('/api/cores')
					.send(core)
					.expect(200)
					.end(function(coreSaveErr, coreSaveRes) {
						// Handle Core save error
						if (coreSaveErr) done(coreSaveErr);

						// Update Core name
						core.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Core
						agent.put('/api/cores/' + coreSaveRes.body._id)
							.send(core)
							.expect(200)
							.end(function(coreUpdateErr, coreUpdateRes) {
								// Handle Core update error
								if (coreUpdateErr) done(coreUpdateErr);

								// Set assertions
								(coreUpdateRes.body._id).should.equal(coreSaveRes.body._id);
								(coreUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Cores if not signed in', function(done) {
		// Create new Core model instance
		var coreObj = new Core(core);

		// Save the Core
		coreObj.save(function() {
			// Request Cores
			request(app).get('/api/cores')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Core if not signed in', function(done) {
		// Create new Core model instance
		var coreObj = new Core(core);

		// Save the Core
		coreObj.save(function() {
			request(app).get('/api/cores/' + coreObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', core.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Core instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Core
				agent.post('/api/cores')
					.send(core)
					.expect(200)
					.end(function(coreSaveErr, coreSaveRes) {
						// Handle Core save error
						if (coreSaveErr) done(coreSaveErr);

						// Delete existing Core
						agent.delete('/api/cores/' + coreSaveRes.body._id)
							.send(core)
							.expect(200)
							.end(function(coreDeleteErr, coreDeleteRes) {
								// Handle Core error error
								if (coreDeleteErr) done(coreDeleteErr);

								// Set assertions
								(coreDeleteRes.body._id).should.equal(coreSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Core instance if not signed in', function(done) {
		// Set Core user 
		core.user = user;

		// Create new Core model instance
		var coreObj = new Core(core);

		// Save the Core
		coreObj.save(function() {
			// Try deleting Core
			request(app).delete('/api/cores/' + coreObj._id)
			.expect(403)
			.end(function(coreDeleteErr, coreDeleteRes) {
				// Set message assertion
				(coreDeleteRes.body.message).should.match('User is not authorized');

				// Handle Core error error
				done(coreDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec(function(){
			Core.remove().exec(function(){
				done();
			});
		});
	});
});
