var rootPath = __dirname + '/../..';

module.exports = {
  dbConnectionString: 'mongodb://localhost/multivision',
  port: 3000,
  viewsPath: rootPath + '/server/views',
  stylusSourcePath: rootPath + '/public',
  faviconPath: rootPath + '/public',
  staticPath: rootPath + '/public',
  partialsPath: rootPath + '/public/app'
};
