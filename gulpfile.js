var gulp = require('gulp');
//var bower = require('gulp-bower')
var concat = require('gulp-concat');
//var replace = require('gulp-replace');
//var del = require('del');
//var templateCache = require('gulp-angular-templatecache');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var iife = require('gulp-iife');
//var minifyCss = require('gulp-minify-css');
//var Server = require('karma').Server;

//========================

var filename = 'app.' + Date.now() + '.';
var folder = 'dist';

gulp.task('default', ['bower', 'clean:dist', 'build']);

gulp.task('js', function () {
  gulp.src(['www/js/app.js', 'www/js/**/*.js'])
      .pipe(concat('app.min.js'))
      .pipe(ngAnnotate())
      .pipe(uglify())
      .pipe(iife())
      .pipe(gulp.dest('www/dist'));
});

gulp.task('watch', function() {
  var watcher = gulp.watch(
    [
      'src/scripts/**/*.js',
      'src/css/**/*.css',
      'src/partials/**/*.html',
      'src/index.html'
    ], ['test', 'clean:dist','build']);
  watcher.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });  
});

gulp.task('bower', function() {
  return bower()
});


gulp.task('build', function() {

  gulp.src('src/partials/**/*.html')
    .pipe(templateCache("templates.js", {module: "webapp", root: "partials/"}))
    .pipe(gulp.dest(folder));

  gulp.src([
    'bower_components/angular/angular.js', 
    'bower_components/angular-ui-router/release/angular-ui-router.min.js',
    'bower_components/angular-mocks/angular-mocks.js', 
    'src/scripts/module.js',
    'src/scripts/**/*.js'])
      .pipe(concat(filename + 'js'))
      .pipe(ngAnnotate())
      .pipe(uglify())
      .pipe(gulp.dest(folder));

  gulp.src([
    'bower_components/bootstrap/dist/css/bootstrap.css', 
    'src/css/**/*.css'])
      .pipe(concat(filename + 'css'))
      .pipe(minifyCss())
      .pipe(gulp.dest(folder));

  gulp.src('src/index.html')
    .pipe(replace('app.', filename))
    .pipe(gulp.dest(folder));
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

gulp.task('clean:dist', function() {
  return del([folder], {force:true});
});