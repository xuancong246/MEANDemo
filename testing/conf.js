exports.config = {
	seleniumServerJar: 'C:/Users/pxcong/AppData/Roaming/npm/node_modules/protractor/selenium/selenium-server-standalone-2.45.0.jar',
	seleniumPort: 4444,
	seleniumArgs: [],
	capabilities: {
		browserName: 'chrome'
	},
	specs: ['./e2e/*Specs.js']
}
