var NavBarPage = require('./../pages/NavBarPage');
var SignInPage = require('./../pages/SignInPage');

describe('Account management', function() {
  var signInPage, navBarPage;

  beforeEach(function() {
    browser.get('http://localhost:3000');
    navBarPage = new NavBarPage();
    navBarPage.signInLink.click();
    signInPage = new SignInPage();
  });

  it('should sign in successfully with existing account', function() {
    signInPage.signInWithAccount('joe@joe', 'joe');

    expect(navBarPage.signInLink.isDisplayed()).toBeFalsy();
    expect(navBarPage.signUpLink.isDisplayed()).toBeFalsy();
    navBarPage.welcomeText.getText().then(function(text) {
      expect(text).toEqual('Joe Eames');
    });
    expect(navBarPage.welcomeText.isDisplayed()).toBeTruthy();
  });

  it('should sign in failed with non existed account', function() {
    signInPage.signInWithAccount('invalid@invalid', 'invalid');

    expect(navBarPage.signInLink.isDisplayed()).toBeTruthy();
    expect(navBarPage.signUpLink.isDisplayed()).toBeTruthy();
    expect(signInPage.username.getAttribute('value')).toEqual('invalid@invalid');
    expect(signInPage.password.getAttribute('value')).toEqual('invalid');
  });
});
