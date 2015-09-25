'use strict';

var path = require('path');
var appDir = path.dirname(require.main.filename);

/**
 * Render the main application page
 */
exports.renderIndex = function (req, res) {
    res.render('modules/core/server/views/index');
};