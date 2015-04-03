describe('Getting cell content', function() {
	var TestPage = require('./TestPage'), testPage;

	beforeEach(function() {
		browser.driver.get('http://localhost:3000/courses');
    browser.driver.manage().window().maximize();
		testPage = new TestPage();
	});

	it('should read cell content correctly', function() {
		expect(testPage.getValue('Title')).toEqual('A Survival Guide to Code Reviews123');
	});
});
