var TestPage = function() {
		var self = this;
		self.getValue = getValue;

		function getValue(columnName) {
			var q = require('q');
			var defer = q.defer();
			getHeaderNames().then(function(headerNames) {
				var index = -1;
				for (var i = 0; i < headerNames.length; i ++) {
					if (headerNames[i] === columnName) {
						index = i;
						break;
					}
				}
				// defer.resolve(getFirstDataRow().all(by.css('td')).then(function(tds) {
				// 	return tds[index].getText();
				// }));
				defer.resolve(getFirstDataRow().all(by.css('td')).then(function(tds) {
					return tds[index].getText();
				}));
			});
			return defer.promise;
		}

		function getHeaderNames() {
			var headerNames = element.all(by.css('table.table.table-hover.table-striped.table-condensed thead tr th')).map(function (th) {
				return th.getText();
			});
			return headerNames;
		}

		function getFirstDataRow() {
			return element(by.css('table.table.table-hover.table-striped.table-condensed tbody')).element(by.css('tr'));
		}
}

module.exports = TestPage;
