var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var clean = require('gulp-clean');
var browserSync = require('browser-sync').create();
var runSequence = require('run-sequence');


gulp.task('clean', function() {
  return gulp.src('dist/').pipe(clean());
});

gulp.task('styles', function() {
  return gulp.src('src/scss/{main.scss,vendor.scss}')
    .pipe(plumber({
      errorHandler: notify.onError(function(err) {
        return {
          title: 'Styles',
          message: err.message
        }
      })
    }))
    .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(autoprefixer({
        browsers: ['last 3 versions']
      }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  })
});

gulp.task('watch', function() {
  gulp.watch('src/scss/**/*.scss', ['styles']);
  gulp.watch('dist/**/*.*').on('change', browserSync.reload);
});

gulp.task('dev', ['styles', 'watch', 'browser-sync']);

gulp.task('prod', ['styles']);

gulp.task('default', function() {
  return runSequence('clean', 'dev');
});

gulp.task('build', function() {
  return runSequence('clean', 'prod');
});
