exports.config = {
  // directConnect: true, // Don't need to use Selenium server
	// seleniumAddress: 'http://localhost:4444/wd/hub', // Will ignore seleniumServerJar, seleniumPort and seleniumArgs
	seleniumServerJar: 'C:/Users/pxcong/AppData/Roaming/npm/node_modules/protractor/selenium/selenium-server-standalone-2.45.0.jar',
	seleniumPort: 4444,
	seleniumArgs: [],
  capabilities: {
		browserName: 'chrome'
    // browserName: 'phantomjs'
	},
  suites: {
    account: 'account/accountSpec.js',
    course: 'course/*Spec.js'
  },
  restartBrowserBetweenTests: true
}
