'use strict';

module.exports = {
  secure: {
    ssl: true,
    privateKey: './config/sslcerts/key.pem',
    certificate: './config/sslcerts/cert.pem'
  },
  port: process.env.PORT || 8443,
  livereload: true,
  seedDB: process.env.MONGO_SEED || false,
  offrApiKey: '000000001',
  session_secret: 'x2#4fDsa',
  enableSpoofUser: false
};
