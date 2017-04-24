var gulp = require('gulp'),
    sass = require('gulp-sass'),//插件也要导入进去
    webserver = require('gulp-webserver');
gulp.task('sass', function() {
    return gulp.src('./style/sass/*.scss')
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(gulp.dest('./style'));
});
gulp.task('watch', function(){
    gulp.watch('./style/sass/*.scss', ['sass']);
});
gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
        host: '0.0.0.0',
        port: 9991,
        livereload: true,
        directoryListing: true,
        open: true,
        fallback: './index.html'
    }));
});