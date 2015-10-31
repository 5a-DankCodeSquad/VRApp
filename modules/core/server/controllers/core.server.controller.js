'use strict';

var path = require('path');
var appDir = path.dirname(require.main.filename);

/**
 * Render the main application page
 */
exports.renderHome = function (req, res) {
    if(req.session && req.session.userId) {
	    res.redirect('/app');
    } else {
	    res.redirect('/login');
    }
};