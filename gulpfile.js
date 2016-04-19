// Import required dependencies.
var gulp = require('gulp'),
browserSync = require('browser-sync'),
browserSyncReload = browserSync.reload,
sass = require('gulp-sass'),
filter = require('gulp-filter'),
concat = require('gulp-concat'),
jade = require('gulp-jade'),
uglify = require('gulp-uglify');

var browserSyncConfig = {
  server: {
    baseDir: './'
  },
  files: [
    'assets/css/*.css',
    'assets/js/*.js',
    '*.html'
  ]
};

gulp.task('sass', function() {
  return gulp.src('scss/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('assets/css'))
  .pipe(filter('**/*.css'))
  .pipe(browserSyncReload({stream: true}));
});

gulp.task('browser-sync', function() {
  browserSync(browserSyncConfig);
});

gulp.task('jade-compile', function () {
  gulp.src([
    'jade/[^_]*.jade',
    'jade/*/[^_]*.jade'
  ])
  .pipe(jade({pretty: true}))
  .pipe(gulp.dest('./'));
});

gulp.task('bundle-js', function() {
  return gulp.src([
    'js/*.js'
  ])
  .pipe(concat('bundle.js'))
  .pipe(uglify())
  .pipe(gulp.dest('assets/js'));
});

gulp.task('watch', function() {
  gulp.watch('scss/*.scss', ['sass']);
  gulp.watch('jade/*.jade', ['jade-compile']);
  gulp.watch('jade/*/*.jade', ['jade-compile']);
  gulp.watch('js/*.js', ['bundle-js']).on('change', browserSyncReload);
});

gulp.task('default', ['sass', 'jade-compile', 'bundle-js', 'browser-sync', 'watch']);
