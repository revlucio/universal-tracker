module.exports = function(config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['jasmine'],
    files: [
      'www/dist/vendor.min.js',
      'lib/angular-mocks/angular-mocks.js',
      'www/dist/app.min.js',
      'www/tests/**/*.js'
    ],
    singleRun: true
  });
};