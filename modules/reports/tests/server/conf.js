exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['report.tests.js'],
  capabilities: {
    'browserName': 'safari' 
  }
};