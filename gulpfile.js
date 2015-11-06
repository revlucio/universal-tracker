var gulp = require('gulp');
var Server = require('karma').Server;
var $ = require('gulp-load-plugins')();

//========================

var filename = 'app.' + Date.now() + '.';
var folder = 'www/dist';

gulp.task('default', function() {
  var watcher = gulp.watch('www/js/**/*.*', 'build');
});
gulp.task('build', ['js', 'css', 'html']);
gulp.task('tdd', ['watchjs', 'test']);

gulp.task('js', function () {
  gulp.src(['www/js/app.module.js', 'www/js/**/*.js'])
      .pipe($.concat('app.min.js'))
      .pipe($.ngAnnotate())
      //.pipe($.uglify())
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
  gulp.src('www/js/**/*.html')
    .pipe($.angularTemplatecache("templates.js", {module: "tracker", root: ""}))
    .pipe(gulp.dest(folder));
});

gulp.task('watchjs', function() {
  gulp.watch(['www/js/**/*.js'], ['js']);  
});

gulp.task('vendor', function () {
  gulp.src([
    'lib/ionic/release/js/ionic.bundle.min.js', 
    'lib/moment/min/moment.min.js',
    'lib/angular-moment/angular-moment.min.js',
    'lib/ngCordova/dist/ng-cordova.min.js',
    'lib/angular-touch/angular-touch.min.js',
    'lib/lodash/lodash.min.js',
    'lib/angular-material/angular-material.min.js',
    'lib/angular-animate/angular-animate.min.js',
    'lib/angular-aria/angular-aria.min.js',
    'www/1self/1self.js'])
      .pipe($.concat('vendor.min.js'))
      //.pipe($.uglify())
      .pipe(gulp.dest(folder));

  gulp.src([
    'lib/ionic/release/css/ionic.min.css',
    'lib/angular-material/angular-material.min.css',
    'lib/angular-material/angular-material.layouts.min.css'])
      .pipe($.concat('vendor.min.css'))
      //.pipe($.minifyCss())  
      .pipe(gulp.dest(folder + '/css'));

  gulp.src('lib/ionic/release/fonts/*.*')
    .pipe(gulp.dest(folder + '/fonts'));
});

gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js'
  }, function() {
    done()
  }).start();
});