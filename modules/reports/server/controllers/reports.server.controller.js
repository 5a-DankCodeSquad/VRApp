'use strict';

var request = require('request');
var path = require('path');
var appDir = path.dirname(require.main.filename);
var config = require(appDir + '/config/config');

//base url with authentication
var username = config.adrollUser,
    password = config.adrollPassword,
    base_url = "https://" + username + ':' + password + '@' + config.adrollApiUri;

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

    //arguments
    var url = base_url + "campaign/get" + "?campaign=" + req.session.eid;

    request.get({url: url}, function (error, responce, body) {
		res.send(body);
	});
};

/**
 * campaign summary report
 */
function getCampaign(req, res) {

    //arguments
    var url = base_url + "report/campaign?data_format=entity&campaigns=" + req.session.eid + ',';

    request.get({url: url}, function (error, responce, body) {
		res.send(body);
	});
}

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
			case "campaign":
				getCampaign(req, res);
				break;
	    }
    } 
};
