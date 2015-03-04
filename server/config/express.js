var stylus = require('stylus'),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  favicon = require('serve-favicon'),
  express = require('express'),
  session = require('express-session'),
  passport = require('passport');

module.exports = function(app, config) {
  function compile(str, path) {
      return stylus(str).set('filename', path);
  }

  app.set('views', config.viewsPath);
  app.set('view engine', 'jade');
  app.use(logger('dev'));
  app.use(cookieParser());
  app.use(bodyParser());
  app.use(bodyParser.urlencoded({
      extended: true
  }));
  app.use(session({secret: 'multi vision unicorns'}));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(stylus.middleware({
      src: config.stylusSourcePath,
      compile: compile
  }));

  app.use(favicon(config.faviconPath + '/favicon.ico'));
  app.use(express.static(config.staticPath));
};
