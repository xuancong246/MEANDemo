var mongoose = require('mongoose'),
  userModel = require('./../models/User'),
  courseModel = require('./../models/Course');

module.exports = function(config) {
  mongoose.connect(config.dbConnectionString);
  var dbConnection = mongoose.connection;
  dbConnection.on('error', console.error.bind(console, 'DB connection error ...'));
  dbConnection.once('open', function callback() {
      console.log('multivision db opened!');
  });

  userModel.createDefaultUsers();
  courseModel.createDefaultCourses();
};
