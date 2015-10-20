'use strict';

/**
 * test report data
 */
var reportTest = function() {
    return '{"foo":5,"bar":7}';
};


/**
 * authenticate and get a new sessionId
 */
exports.getReportData = function (req, res) {

    //to hold JSON string
    var data = '';

    //select the right data
	switch(req.query.report_type) {
			case "test":
				data = reportTest();
				break;
	}
 
    res.send(data);
};