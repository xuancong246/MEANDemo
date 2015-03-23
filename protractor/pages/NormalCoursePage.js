var NormalCoursePage = function() {
  this.filter = element(by.model('vm.model.searchText'));
  this.sort = element(by.model('vm.model.sortOrder'));

  this.setFilter = function(value) {
    this.filter.sendKeys(value);
  };

  this.setSort = function(value) {
    this.sort.element(by.cssContainingText('option', value)).click();
  };
};

module.exports = NormalCoursePage;
