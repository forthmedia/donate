var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var del = require('del');

////////// DEFAULT task
// watch for file changes
// refresh browser window

gulp.task('default', ['watch']);

gulp.task('sass', function() {
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
});

gulp.task('watch', ['browserSync', 'sass'], function() {
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

////////// BUILD DISTRIBUTION FOLDER
gulp.task('build', function() {
    return gulp.src('app/*.html')
      .pipe(useref())
      // minify only if JavaScript
      .pipe(gulpIf('*.js', uglify()))
      // minify only if CSS
      .pipe(gulpIf('*.css', cssnano()))
      .pipe(gulp.dest('dist'))
});

////////// CLEAN DISTRIBUTION FOLDER
gulp.task('clean', function() {
  return del.sync('dist');
});
