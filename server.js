var express = require('express'),
  config = require('./server/config/config');

var app = express();

require('./server/config/express')(app, config);
require('./server/config/mongoose')(config);
require('./server/config/passport')();
require('./server/config/routes')(app, config);

app.listen(config.port);
console.log('We are running at port ' + config.port + '!');
