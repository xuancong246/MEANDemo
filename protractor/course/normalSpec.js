var NavBarPage = require('./../pages/NavBarPage');
var NormalCoursePage = require('./../pages/NormalCoursePage');

xdescribe('Course management, using normal case', function() {
  var navBarPage, normalCoursePage;

  beforeEach(function() {
    browser.get('http://localhost:3000');
    navBarPage = new NavBarPage();
    navBarPage.coursesLink.element(by.css('b.caret')).click();
    element(by.cssContainingText('a[href="/courses"]', 'Courses (Normal)')).click();
    normalCoursePage = new NormalCoursePage();
  });

  it('should display no result when filtering with non existed title', function() {
    normalCoursePage.setFilter('not existed title');

    element.all(by.repeater('course in vm.model.courses')).then(function(courses_) {
      expect(courses_.length).toEqual(0);
    });
  });

  it('should display correct result when filtering with existed title', function() {
    var searchKey = 'for';
    normalCoursePage.setFilter(searchKey);

    element.all(by.repeater('course in vm.model.courses').column('course.title')).then(function(titles) {
      expect(titles.length).toBeGreaterThan(0);

      for (var i = 0; i < titles.length; i ++) {
        expect(titles[i].getText()).toContain(searchKey);
      }
    });
  });

  it('should display correct result when sorting by title', function() {
    normalCoursePage.setSort('Sort by Publish Date');
    normalCoursePage.setSort('Sort by Title');

    element.all(by.repeater('course in vm.model.courses').column('course.title')).then(function(titles) {
      expect(titles.length).toBeGreaterThan(0);

      for (var i = 0; i < titles.length - 1; i ++) {
        expect(titles[i].getText()).not.toBeGreaterThan(titles[i + 1].getText());
      }
    });
  });

  xit('should display correct result when sorting by published date', function() {
    normalCoursePage.setSort('Sort by Publish Date');

    element.all(by.repeater('course in vm.model.courses').column('course.title')).then(function(titles) {
      expect(titles.length).toBeGreaterThan(0);

      //todo: how to compare two formatted dates as strings
    });
  });
});
