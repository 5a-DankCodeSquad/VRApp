'use strict';

module.exports = function(app) {
	var reports = require('../controllers/reports.server.controller');

	// Reports Routes
	app.route('/api/reports').all()
		.get(reports.getReportData);
};