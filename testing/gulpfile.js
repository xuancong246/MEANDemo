var gulp = require('gulp'),
protractorQA = require('gulp-protractor-qa');
// Registering the task
gulp.task('protractor-qa', function() {
  protractorQA.init({
    testSrc : 'e2e/**/*Spec.js',
    viewSrc : [ './../server/views/index.html', 'partials/*.html' ]
  });
});
// Running it
gulp.task('default', ['protractor-qa']);
