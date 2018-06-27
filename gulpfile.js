var gulp= require('gulp');
var min= require('gulp-minify');
var smaps= require('gulp-sourcemaps');

gulp.task('minify', function () {
    gulp.src('src/js/weather.js')
        .pipe(smaps.init())
    .pipe(min())
        .pipe(smaps.write('maps'))
    .pipe(gulp.dest('dist/js'))
});