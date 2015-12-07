'use strict';


describe('Test Reports page', function() {
	it('Should not include new Reports', function() {
		browser.get('http://localhost:3000/#!/reports');
		expect(element.all(by.repeater('report in reports')).count()).toEqual(0);
	});

	it('Should include new Reports', function() {
		browser.get('http://localhost:3000/app');
		expect(element.all(by.repeater('key in keys')).count()).toBeGreaterThan(0);
	});

});