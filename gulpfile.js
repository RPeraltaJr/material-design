/*  ------------------------------------------------------------
## INSTALL GULP WITH ALL OF ITS DEPENDENCIES
> `npm install`

## RUN AUTOMATED GULP TASKS
> `gulp`
------------------------------------------------------------- */

// Gulp w/ additional plugins
var gulp = require('gulp'), // npm install gulp
    uglify = require('gulp-uglify'), // npm install gulp-uglify
    plumber = require('gulp-plumber'), // npm install gulp-plumber
    cleanCSS = require('gulp-clean-css'), // npm install gulp-clean-css
    imagemin = require('gulp-imagemin'), // npm install gulp-imagemin
    sass = require('gulp-ruby-sass'); // npm install gulp-ruby-sass

// Error Log Function (Alternative to Plumber)
function errorLog(error) {
    console.error.bind(error);
    this.emit('end');
}

// Compress Images
gulp.task('image', function(){
    gulp.src('assets/img/**') // Anything in our img folder (Use two stars [**] to target any image within folder and its sub-folders)
        .pipe(imagemin()) // Run imagemin() function
        .pipe(gulp.dest('assets/build/img')); // Compressed image destination
});

// SASS to CSS
gulp.task('sass', function () {
  return sass('assets/sass/**.scss')
    .on('error', sass.logError)
    .pipe(gulp.dest('assets/sass/'));
});

// Compress Styles
gulp.task('minify-css', function(){
   return gulp.src('assets/sass/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('assets/css/'));
});

// Compresses Scripts
gulp.task('scripts', function(){
    // run for any js file inside js directory
    gulp.src('assets/js/*.js')
        .pipe(plumber()) // Plumber function to prevent watch from stopping if errors
        .pipe(uglify()) // Uglify function to compress js
        // .on('error', errorLog) Alternative to Plumber
        .pipe(gulp.dest('assets/build/js')); // Compressed js destination
});

// Watch Task
// Watches for Sass, Image & Scripts
// Watch files for any changes. If yes, run the task
gulp.task('watch', function() {
    gulp.watch('assets/img/**', ['image']);
    gulp.watch('assets/sass/**.scss', ['sass']);
    gulp.watch('assets/sass/*.css', ['minify-css']);
    gulp.watch('assets/js/*.js', ['scripts']);
});

gulp.task('default', ['scripts', 'image', 'sass', 'minify-css', 'watch']); // Place all gulp tasks
