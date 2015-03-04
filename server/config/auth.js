var passport = require('passport');

exports.authenticate = authenticate;
exports.requiresRole = requiresRole;

function authenticate(req, res, next) {
  req.body.username = req.body.username.toLowerCase();
  var auth = passport.authenticate('local', function(err, user) {
    if (err) {return next(err);}
    if (!user) {res.send({success: false});}
    req.logIn(user, function(err) {
      if (err) {return next(err);}
      res.send({success: true, user: user});
    });
  });
  auth(req, res, next);
};

function requiresRole(role) {
  return function(req, res, next) {
    if (typeof req.isAuthenticated !== 'function' || req.user === undefined) {
      res.end();
      return;
    }
    if (!req.isAuthenticated() || req.user.roles.indexOf(role) === -1) {
      res.status(403);
      res.end();
    } else {
      next();
    }
  }
}
