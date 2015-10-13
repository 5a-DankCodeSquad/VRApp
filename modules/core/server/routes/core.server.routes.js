'use strict';

module.exports = function(app) {
	var core = require('../controllers/core.server.controller');

    // Define application route
    app.route('/*').get(core.renderHome);
};
