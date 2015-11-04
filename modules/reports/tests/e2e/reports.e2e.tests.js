'use strict';

describe('Reports E2E Tests:', function() {
	describe('Test Reports page', function() {
		it('Should not include new Reports', function() {
			browser.get('http://localhost:3000/#!/reports');
			expect(element.all(by.repeater('report in reports')).count()).toEqual(0);
		});
	});
});
