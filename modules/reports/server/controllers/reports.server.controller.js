'use strict';

var request = require('request');
var path = require('path');
var appDir = path.dirname(require.main.filename);
var config = require(appDir + '/config/config');

//base url with authentication
var username = config.adrollUser,
    password = config.adrollPassword,
    base_url = "https://" + username + ':' + password + '@' + config.adrollApiUri + 'report/campaign'; 

/**
 * test report data
 */
var reportTest = function(req, res) {
    res.send('{"foo":5,"bar":7}');
};

/**
 * CTI report
 */
var cti = function(req, res) {

    //construct campaign ID
    var cid = req.session.userId + "-" + req.session.fname + req.session.lname;

    //arguments
    var url = base_url +
        "?data_format=date" +
        "&campaigns=" + cid +
        "&past_days=" + req.query.days;

    request.get({url: url}, function (error, responce, body) {
		res.send(body);
	});
};

/**
 * selects correct report type and sends back appropriate data
 */
exports.getReportData = function (req, res) {

    //to hold JSON string
    var data = '';

    //send back 403 for unauthenticated users
    if(!(req.session && req.session.userId)) {
	    res.status(403).send("authentication failed");
    } else {

        //select the right data
	    switch(req.query.report_type) {
		    	case "test":
		    		reportTest(req, res);
		    		break;
		    	case "cti":
		    		cti(req, res);
		    		break;
	    }
    } 
};
