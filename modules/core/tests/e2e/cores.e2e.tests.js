'use strict';

describe('Cores E2E Tests:', function() {
	describe('Test Cores page', function() {
		it('Should not include new Cores', function() {
			browser.get('http://localhost:3000/#!/cores');
			expect(element.all(by.repeater('core in cores')).count()).toEqual(0);
		});
	});
});
