var concat      = require('gulp-concat');
var gulp        = require('gulp');
var jsmin       = require('gulp-jsmin');
var sass        = require('gulp-sass');
var rename      = require('gulp-rename');
var watch       = require('gulp-watch');
var notify      = require('gulp-notify');
var livereload  = require('gulp-livereload');


gulp.task('html', function() {
  gulp.src('index.html')
  .pipe(livereload())
  .pipe(notify({ message : "html"}));
})

gulp.task('js', function () {
  gulp.src('js/scripts.js')
    .pipe(jsmin())
    .pipe(rename('scripts.min.js'))
    .pipe(gulp.dest('./js'))
    .pipe(livereload())
    .pipe(notify({ message : "js"}))
});

/* Generar archivo js/vendor.js automáticamente concatenando todo lo que esté en js/vendors/ */
gulp.task('vendorjs', function () {
  gulp.src([
      'js/vendor/*.js'
    ])
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./js'))
    .pipe(livereload())
    .pipe(notify({ message : "js"}));
});

gulp.task('sass', function () {
  gulp.src('./css/styles.s*ss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'))
    .pipe(livereload())
    .pipe(notify({ message : "sass"}));
});

/* WATCH */
gulp.task('watch', function () {
  livereload.listen();
  gulp.watch('js/*.js', ['js']);
  gulp.watch('js/vendor/*.js', ['vendorjs']);
  gulp.watch(['**/*.html','**/*.php'], ['html']);
  gulp.watch(['css/**/*.scss','css/**/*.sass'], ['sass']);
});

/* Default task */
gulp.task('default', ['watch']);
