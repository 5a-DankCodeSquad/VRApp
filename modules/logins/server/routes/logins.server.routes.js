'use strict';

var path = require('path');
var appDir = path.dirname(require.main.filename);
var config = require(appDir + '/config/config');

module.exports = function(app) {
	var logins = require('../controllers/logins.server.controller');

	// Logins Route
	app.route('/api/logins').all()
		.post(logins.getSession);

	// User Spoofer Route
	app.route("/api/spoofer").all()
    	.get(logins.spoofUser);
    
};
