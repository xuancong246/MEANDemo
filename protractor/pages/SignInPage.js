SignInPage = function() {
  this.username = element(by.model('vm.model.username'));
  this.password = element(by.model('vm.model.password'));
  this.signInBtn = element(by.id('signIn'));

  this.setUsername = function(username) {
    this.username.sendKeys(username);
  };

  this.setPassword = function(password) {
    this.password.sendKeys(password);
  };

  this.setAccount = function(username, password) {
    this.setUsername(username);
    this.setPassword(password);
  };

  this.signIn = function() {
    this.signInBtn.click();
  };
  
  this.signInWithAccount = function(username, password) {
    this.setAccount(username, password);
    this.signIn();
  };
};

module.exports = SignInPage;
