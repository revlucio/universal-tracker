var gulp = require('gulp');
//var Server = require('karma').Server;
var $ = require('gulp-load-plugins')();

//========================

var filename = 'app.' + Date.now() + '.';
var folder = 'www/dist';

gulp.task('default', ['watch']);
gulp.task('build', ['js', 'css', 'html']);

gulp.task('js', function () {
  gulp.src(['www/js/app.js', 'www/js/**/*.js'])
      .pipe($.concat('app.min.js'))
      .pipe($.ngAnnotate())
      .pipe($.uglify())
      .pipe($.iife())
      .pipe(gulp.dest(folder));
});

gulp.task('css', function() {
  gulp.src('www/css/**/*.css')
    .pipe($.concat('app.min.css'))
    .pipe($.minifyCss())
    .pipe(gulp.dest(folder));
});

gulp.task('html', function() {
  gulp.src('www/templates/**/*.html')
    .pipe($.angularTemplatecache("templates.js", {module: "tracker", root: "templates/"}))
    .pipe(gulp.dest(folder));
});

gulp.task('watch', function() {
  var watcher = gulp.watch(['www/js/**/*.js'], ['js']);
});

gulp.task('vendor', function () {
  gulp.src([
    'www/lib/ionic/release/js/ionic.bundle.min.js', 
    'www/lib/moment/min/moment.min.js',
    'www/lib/angular-moment/angular-moment.min.js',
    'www/lib/ngCordova/dist/ng-cordova.min.js',
    'www/lib/angular-touch/angular-touch.min.js',
    'www/lib/lodash/lodash.min.js',
    'www/lib/angular-material/angular-material.min.js',
    'www/lib/angular-animate/angular-animate.min.js',
    'www/lib/angular-aria/angular-aria.min.js',
    'www/1self/1self.js'])
      .pipe($.concat('vendor.min.js'))
      //.pipe($.uglify())
      .pipe(gulp.dest(folder));

  gulp.src([
    'www/lib/ionic/release/css/ionic.min.css',
    'www/lib/ionicons/css/ionicons.min.css',
    'www/lib/angular-material/angular-material.min.css',
    'www/lib/angular-material/angular-material.layouts.min.css'])
      .pipe($.concat('vendor.min.css'))
      //.pipe($.minifyCss())  
      .pipe(gulp.dest(folder));
});



gulp.task('bower', function() {
  return bower()
});

gulp.task('test', ['bower'], function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('tdd', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});