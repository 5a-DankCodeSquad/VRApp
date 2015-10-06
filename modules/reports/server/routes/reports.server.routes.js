'use strict';

module.exports = function(app) {
	var reports = require('../controllers/reports.server.controller');
	var reportsPolicy = require('../policies/reports.server.policy');

	// Reports Routes
	app.route('/api/reports').all()
		.get(reports.list).all(reportsPolicy.isAllowed)
		.post(reports.create);

	app.route('/api/reports/:reportId').all(reportsPolicy.isAllowed)
		.get(reports.read)
		.put(reports.update)
		.delete(reports.delete);

	// Finish by binding the Report middleware
	app.param('reportId', reports.reportByID);
};