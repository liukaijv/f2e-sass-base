var gulp = require('gulp'),

	// css
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	minifycss = require('gulp-minify-css'),

	// js
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),

	rename = require('gulp-rename'),
	copy = require('gulp-copy'),
	del = require('del'),

	// server
	connect = require('gulp-connect'),
	url = require('url'),
	path = require('path'),
	fs = require('fs');


// compile scss
gulp.task('scss', function () {

	gulp.src('src/scss/main.scss')
		.pipe(sass())
		.pipe(autoprefixer({
			browsers: ['last 2 versions', 'Android >= 4.0'],
			cascade: true,
		}))
		.pipe(gulp.dest('dist/css'))
		.pipe(minifycss())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('dist/css'));

});

// compile javascript
gulp.task('script', function () {

	gulp.src(['src/js/main.js'])
		.pipe(concat('main.js'))
		.pipe(gulp.dest('dist/js'))
		.pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('dist/js'));

});

// copy html
gulp.task('html', function () {

	gulp.src('*.html')
		.pipe(copy('dist'))

});

// clean
gulp.task('clean', function () {

	return del(['dist/**']);

});

// build
gulp.task('build', ['clean'], function () {

	gulp.start('scss', 'script');

});

// default
gulp.task('default', function () {

	// watch scss files
	gulp.watch('src/scss/**/*.scss', ['scss']);

	// watch javascript files
	gulp.watch('src/js/**/*.js', ['script']);

});