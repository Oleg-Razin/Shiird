/* plugins */
var axe = require('gulp-axe-webdriver'),
    browsersync = require('browser-sync'),
    cache = require('gulp-cache'),
    changed = require('gulp-changed'),
    cheerio = require('gulp-cheerio'),
    autoprefixer = require('gulp-autoprefixer');
    cleanCSS = require('gulp-clean-css'),
    clone = require('gulp-clone'),
    concat = require('gulp-concat'),
    del = require('del'),
    gulp = require('gulp'),
    gulpFilter = require('gulp-filter'),
    gulpIf = require('gulp-if'),
    imagemin = require('gulp-imagemin'),
    merge = require('merge-stream'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    svgSymbols = require('gulp-svg-symbols'),
    sourcemaps = require('gulp-sourcemaps'),
    terser = require('gulp-terser'),
    webp = require('gulp-webp'),
    zip = require('gulp-zip'),
    order = require("gulp-order");


/* paths */

var paths = {
    src: 'src/',
    dist: 'dist/'
};

var inputs = {
    js: paths.src + 'js',
    css: paths.src + 'css',
    scss: paths.src + 'scss',
    img: paths.src + 'img',
    sprites: paths.src + 'sprites',
    css_img_path: '../img'
};

var outputs = {
    js: paths.dist + 'js',
    css: paths.dist + 'css',
    scss: paths.dist + 'scss',
    img: paths.dist + 'img',
    sprites: paths.dist + 'sprites',
    css_img_path: '../img'
};

// url of your project
var urlSync = 'esr.local';

/*
 * Tasks
 * 1/ compass
 * 2/ scripts
 * 3/ images
 * 4/ sprites
 * 5/ extend
 * 6/ styleguide
 * 7/ zip
 * 8/ watch
 * 9/ accessibility check
 * 
 */

/* remove print css from concatenation + Concatenate & Minify CSS */
gulp.task('sass', function () {
    var filterPrint = gulpFilter(['*', '!print.scss']);

    var all = gulp.src([inputs.scss + '/style.scss',
    inputs.scss + '/**/*.scss',
    inputs.scss + '/*.scss'])
        .pipe(plumber())
        .pipe(filterPrint)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.init())
        .pipe(concat('styles.css'))
        .pipe(gulp.dest(outputs.css))
        .pipe(cleanCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(outputs.css))
        .pipe(browsersync.reload({ stream: true }))
        .pipe(notify({ message: 'styles.min.css generated', onLast: true }));

    var print = gulp.src(inputs.scss + '/print.scss')
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(outputs.css))
        .pipe(cleanCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(outputs.css))
        .pipe(browsersync.reload({ stream: true }))
        .pipe(notify({ message: 'print.min.css generated', onLast: true }));

    return all, print;
});

/* Concatenate & Minify JS */
gulp.task('scripts', function () {
    return gulp.src([
        '!' + inputs.js + '/scripts.js',
        inputs.js + '/shared/*.js', 
        inputs.js + '/*.js'
        ])
        //manage order
        .pipe(order([
            'swiper.min.js',
            'magnific-popup.min.js',
            'isotope.pkgd.min.js',
            'global.js',
            'packery-mode.pkgd.min.js',
        ]))
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(outputs.js))
        .pipe(rename({ suffix: '.min' }))
        .pipe(terser())
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest(outputs.js))
        .pipe(browsersync.reload({ stream: true }))
        .pipe(notify({ message: 'Scripts task complete', onLast: true }));
});

gulp.task('home', function () {
    return gulp.src([inputs.js + '/scripts.js'])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concat('home.js'))
        .pipe(gulp.dest(outputs.js))
        .pipe(rename({ suffix: '.min' }))
        .pipe(terser())
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest(outputs.js))
        .pipe(browsersync.reload({ stream: true }))
        .pipe(notify({ message: 'Home Script task complete', onLast: true }));
});


//usefull for Drupal/WordPress projects that already include jquery, list all the scripts to exclude here
gulp.task('scripts_light', function () {
    var filterJS = gulpFilter(['**', '!jquery.min.js']);
    return gulp.src([inputs.js + '/shared/*.js', inputs.js + '/*.js'])
        //manage order
        .pipe(order([
            'swiper.min.js',
            'magnific-popup.min.js',
            'video.min.js',
            'global.js',
            'home.js',
        ]))
        .pipe(plumber())
        .pipe(filterJS)
        .pipe(sourcemaps.init())
        .pipe(concat('scripts_light.js')) //for fabricator
        .pipe(gulp.dest(outputs.js))
        .pipe(rename({ suffix: '.min' }))
        .pipe(terser())
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest(outputs.js))
        .pipe(browsersync.reload({ stream: true }))
        .pipe(notify({ message: 'Scripts light task complete', onLast: true }));
});

/* Optimize images */
gulp.task('images', function () {
    var cloneSink = clone.sink();

    return gulp.src([inputs.img + '/**/*', '!' + inputs.img + '/**/*.webp'])
        .pipe(plumber())
        .pipe(changed(inputs.img + '/**/*')) //parse only new or updated files
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.jpegtran({ progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: false },
                    { cleanupIDs: false }
                ]
            })
        ]))

        .pipe(cloneSink)   // clone image
        .pipe(webp())      // convert cloned image to WebP
        .pipe(cloneSink.tap())
        .pipe(gulp.dest(inputs.img));
});

/* sprites management 
 * generate svg file for inline use
 */

gulp.task('sprites', function () {
    return gulp.src([inputs.sprites + '/**/*.svg'])
        .pipe(plumber())
        .pipe(cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');
            },
            parserOptions: { xmlMode: true }
        }))
        .pipe(svgSymbols(
            {
                title: '%f',
                svgClassname: 'a11y_hidden',
                fontSize: 10
            }
        ))
        .pipe(gulpIf(/[.]svg$/, gulp.dest(inputs.img + '/global')))
        .pipe(gulpIf(/[.]css$/, gulp.dest(inputs.scss + '/base')))
        .pipe(notify({ message: 'Sprite generated', onLast: true }));
});

/* rename generated css file for sprites */

gulp.task('rename-sprites', ['sprites'], function () {
    return gulp.src([inputs.scss + '/base/*.css'])
        .pipe(plumber())
        .pipe(rename({
            basename: '_sprites',
            extname: '.scss'
        }))
        .pipe(gulp.dest(inputs.scss + '/base'))
});

/* delete the useless css file */
gulp.task('clean-sprites', ['rename-sprites'], function () {
    return del([inputs.scss + '/base/*.css'], { force: true })
});

/* Create an archive with the current date containing all files needed
 * we exlude unecessary files for the customer like scss and sprite source
 */
gulp.task('zipDelivery', function () {
    var date = new Date().toLocaleDateString().replace(/[^0-9]/g, '');
    return gulp.src(['*.html',
        inputs.css + '/**',
        inputs.img + '/**',
        inputs.js + '/**'], { base: "." })
        .pipe(plumber())
        .pipe(zip('delivery-' + date + '.zip'))
        .pipe(gulp.dest(paths.dist))
        .pipe(notify({ message: 'Archive generated' }));
});

/* browsersync */
// gulp.task('browser-sync', function () {
//     browsersync.init({
//         proxy: urlSync, 
//         port: 3000
//     });
// });

// gulp.task('browsersync-reload', function () {
//     browsersync.reload();
// });


// Watch Files For Changes
// gulp.task('watch', ['browser-sync'], function (testCB) {
gulp.task('watch', function (testCB) {
    gulp.watch(inputs.scss + '/**/*.scss', ['sass']);
    gulp.watch(inputs.js + '/**/home.js', ['home']);
    gulp.watch(inputs.js + '/**/!(home.js)*.js', ['scripts']);
    gulp.watch(inputs.img + '/**/*', ['images']);
    gulp.watch(inputs.sprites + '/**', ['clean-sprites']);
});

gulp.task('build-css-js', ['sass','home', 'scripts' ]);

/* accessibility task */
gulp.task('axe', function (done) {
    var options = {
        saveOutputIn: 'a11yResult.json',
        browser: 'phantomjs',
        urls: ['*.html']
    };
    return axe(options, done);
});

// Default Task
gulp.task('default', ['watch']);
gulp.task('delivery', ['zipDelivery']);