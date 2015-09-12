var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    connect = require('gulp-connect'),
    sourcemaps = require('gulp-sourcemaps'),
    gutil = require('gulp-util');

gulp.task('javascript', function(){
    return gulp.src('./src/**/*.js')
    .pipe(sourcemaps.init())
        .pipe(uglify().on('error', gutil.log))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./dist/'))
    .pipe(connect.reload());
});

gulp.task('markup', function(){
    gulp.src('./src/**/*.html')
    .pipe(gulp.dest('./dist/'))
    .pipe(connect.reload())
    .pipe(connect.reload());
});

gulp.task('connect', function(){
    return connect.server({
        root: './dist',
        livereload : true
    });
});

gulp.task('watch', ['markup', 'javascript'], function() {
    gulp.watch(['./src/**/*.js'], ['javascript']);
    gulp.watch(['./src/**/*.html'], ['markup']);
});

gulp.task('default', ['connect', 'javascript', 'markup', 'watch']);
