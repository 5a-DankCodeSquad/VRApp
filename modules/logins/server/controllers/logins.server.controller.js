'use strict';

var request = require('request');
var path = require('path');
var appDir = path.dirname(require.main.filename);
var config = require(appDir + '/config/config');

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

                    //make a new session
                    req.session.userId = userId;

                    //now they never need to login again
                    res.send();

                } else {
                    //invalid login
                    res.status(403).send("invalid username or password");
                }
            }
        });
};

/*
 * used to spoof a user, if enabled
 */
exports.spoofUser = function(req, res) {

    if(config.enableSpoofUser) {
        req.session.userId = req.query.codename;
        res.render('modules/logins/server/views/the_man_who_sold_the_world', {alias : req.session.userId});
    } else {res.status(403).send()}
};