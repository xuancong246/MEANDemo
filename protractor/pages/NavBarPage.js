var NavBarPage = function() {
  this.signInLink = element(by.css('a[href="/signin"]'));
  this.signUpLink = element(by.css('a[href="/signup"]'));
  this.coursesLink = element(by.cssContainingText('a.dropdown-toggle', 'Courses'));
  this.welcomeText = element(by.css('div[ng-controller="mvNavBarLoginCtrl as vm"] li.dropdown a.dropdown-toggle'));
};

module.exports = NavBarPage;
