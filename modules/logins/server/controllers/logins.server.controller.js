'use strict';

var request = require('request');
var path = require('path');
var appDir = path.dirname(require.main.filename);
var config = require(appDir + '/config/config');

/**
 * gives the session an EID
 */
function sendeid(req, res) {

	    var username = config.adrollUser,
            password = config.adrollPassword,
            base_url = "https://" + username + ':' + password + '@' + config.adrollApiUri + 'report/campaign'; 
    
        //arguments
        var url = base_url +
            "?data_format=entity";

        //construct expected campaign name
        var cname = req.session.userId + "-" + req.session.fname + req.session.lname;

        //get EID
        request.get({url: url}, function (error, responce, body) {
		    
		    var results = JSON.parse(body).results;

            req.session.eid = "NONE";
       
            //search for the cname
		    for(var e in results) {
                console.log(results[e].campaign);
                console.log(cname);
                if (results[e].campaign && results[e].campaign === cname) {               
                    req.session.eid = results[e].eid;
                    break;
                }

		     }
		     		     
		     res.send();
	    });
}

/**
 * authenticate and get a new sessionId
 */
exports.getSession = function(req, res) {

    //make request to offr.com endpoint
    var request = require("request");

    request.get(
        config.offrApiUri + 'getUser.cfm' +
        "?Email=" + req.body.user +
        "&Password=" + req.body.password +
        "&APIKEY=" + config.offrApiKey,

        function(error, response, body) {

            if (error) {
                res.status(500).send(error);
            } else {

                //get userID from parsed responce body
                var parsed = JSON.parse(body);

                //DATA is empty when auth fails
                if (parsed.DATA.length > 0) {

                    var index = parsed.COLUMNS.indexOf("USERID");
                    var userId = parsed.DATA[0][index];
                    var FNAME = parsed.DATA[parsed.COLUMNS.indexOf("FNAME")];
                    var LNAME = parsed.DATA[parsed.COLUMNS.indexOf("LNAME")];
 
                    //make a new session
                    req.session.userId = userId;

	                //store name with session, needed to re-construct campain ID
		            req.session.fname = FNAME;
		            req.session.lname = LNAME;

                    //now they never need to login again
                    sendeid(req, res);

                } else {
                    //invalid login
                    res.status(403).send("invalid username or password");
                }
            }
        });
};

exports.endSession = function(req, res) {
        req.session.destroy(function() {
                res.redirect('/login');
        });
};

/*
 * used to spoof a user, if enabled
 */
exports.spoofUser = function(req, res) {

    if(config.enableSpoofUser) {
        req.session.userId = req.query.uid;
	    req.session.fname = req.query.fname;
	    req.session.lname = req.query.lname;

	    var username = config.adrollUser,
            password = config.adrollPassword,
            base_url = "https://" + username + ':' + password + '@' + config.adrollApiUri + 'report/campaign'; 
    
        //arguments
        var url = base_url +
            "?data_format=entity";

        //construct expected campaign name
        var cname = req.session.userId + "-" + req.session.fname + req.session.lname;

        //get EID
        request.get({url: url}, function (error, responce, body) {
		    
		    var results = JSON.parse(body).results;

            req.session.eid = "NONE";
 
       
            //search for the cname
		    for(var e in results) {
                console.log(results[e].campaign);
                console.log(cname);
                if (results[e].campaign && results[e].campaign === cname) {               
                    req.session.eid = results[e].eid;
                    break;
                }

		     }

		     res.render('modules/logins/server/views/the_man_who_sold_the_world', {alias : req.session.userId + "-" + req.session.fname + req.session.lname + " :" + req.session.eid});
	    });
    } else {res.status(403).send();}
};
