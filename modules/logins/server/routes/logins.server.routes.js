'use strict';

module.exports = function(app) {
	var logins = require('../controllers/logins.server.controller');

	// Logins Routes
	app.route('/api/logins').all()
		.post(logins.getSession);
};