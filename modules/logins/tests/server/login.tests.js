'use strict';

describe('Reports E2E Tests:', function() {
	describe('Test Reports page', function() {
		/*it('Should not include new Reports', function() {
			browser.get('http://localhost:3000/#!/reports');
			expect(element.all(by.repeater('report in reports')).count()).toEqual(0);
		});*/
		it('Valid login', function() {
			browser.get('http://localhost:3000/login');
			var username = element(by.id('inputEmail'));
			username.sendKeys("agent@demo.com");

			var password = element(by.id('inputPassword'));
			password.sendKeys("demo");

			var button = element(by.buttonText('Sign In'));
			button.click();

			expect(browser.getCurrentUrl()).toMatch('localhost:3000/app/');
		});
		it('invalid login', function() {
			browser.get('http://localhost:3000/login');
			var username = element(by.id('inputEmail'));
			username.sendKeys("agt@demo.com");

			var password = element(by.id('inputPassword'));
			password.sendKeys("demo");

			var button = element(by.buttonText('Sign In'));
			button.click();

			expect(browser.getCurrentUrl()).toMatch('localhost:3000/login');
		});
	});
});
