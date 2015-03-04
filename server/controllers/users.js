var encrypt = require('../utilities/encryption'),
  User = require('mongoose').model('User');

exports.getUsers = getUsers;
exports.createUser = createUser;
exports.updateUser = updateUser;

function getUsers(req, res) {
  console.log('run get users');
  debugger;
  User.find({}).exec(function(err, collection) {
    res.send(collection);
    console.log('length: ' + collection.length);
  });
}

function createUser(req, res, next) {
  var userData = req.body;
  userData.username = userData.username.toLowerCase();
  userData.salt = encrypt.createSalt();
  userData.hashed_pwd = encrypt.hashPwd(userData.salt, userData.password);

  User.create(userData, function(err, user) {
    if (err) {
      if (err.toString().indexOf('E11000') > -1) {
        err = new Error('Duplicated Username');
      }
      res.status(400);
      return res.send({reason:err.toString()});
    }
    req.logIn(user, function(err) {
      if (err) {return next();}
      res.send(user);
    });
  });
};

function updateUser(req, res) {
  var updateUser = req.body;
  if (req.user._id != updateUser._id && !req.user.hasRole('admin')) {
    res.status(403);
    return res.end();
  }

  req.user.firstName = updateUser.firstName;
  req.user.lastName = updateUser.lastName;
  req.user.username = updateUser.username;
  if (updateUser.password) {
    req.user.salt = encrypt.createSalt();
    req.user.hashed_pwd = encrypt.hashPwd(req.user.salt, updateUser.password);
  }

  req.user.save(function(err) {
    if (err) {res.status(400); return res.send({reason: err.toString()});}
    res.send(req.user);
  });
}
