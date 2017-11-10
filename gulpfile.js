var gulp         = require('gulp');
var browserSync  = require('browser-sync').create();
var sass         = require('gulp-sass');
var postcss      = require('gulp-postcss');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./public"
    });

    gulp.watch("src/styles/*.scss", ['sass']);
    gulp.watch("public/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS, create sourcemaps, autoprefix, & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("src/styles/*.scss")
        .pipe(sass())
        .pipe(sourcemaps.init())
        .pipe(postcss([ autoprefixer() ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest("public/styles"))
        .pipe(browserSync.stream());
});


gulp.task('default', ['serve']);
