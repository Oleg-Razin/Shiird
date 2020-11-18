var gulp    = require('gulp'),
    sass    = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat  = require('gulp-concat'),
    uglify  = require('gulp-uglifyjs'),
    cleanCss= require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    rename  = require('gulp-rename'),
    htmlmin      = require('gulp-htmlmin'),
    del     = require('del');
    imagemin    = require('gulp-imagemin'), 
    pngquant    = require('imagemin-pngquant');     


gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'dist'
        },
        notify: false
    });
});



gulp.task('sass' , function () {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({stream:true}));
});
gulp.task('script' , function () {
    return gulp.src([
        'src/js/libs/**/*.js',
        'src/js/*.js',
    ])
        .pipe(concat('home.js'))
        .pipe(gulp.dest('dist/js'));
});
gulp.task('script-jquary' , function () {
    return gulp.src([
        'node_modules/jquery/dist/jquery.min.js',
    ])
        .pipe(gulp.dest('dist/js'));
});

gulp.task('img', function() {
    return gulp.src('src/images/**/*')
    .pipe(cache(imagemin({
      interlaced: true,
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    })))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('css-min' , function () {
    return gulp.src([
        'dist/css/style.css',
    ])
        .pipe(cleanCss())
        .pipe(concat('style.min.css'))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('dist/css'))
});

gulp.task('clean', function(done) {
    del.sync('dist');
    done();
});

gulp.task('html', function(){
    return gulp.src('src/*.html')
        .pipe(htmlmin())
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('build-dist', function(done) {
    var buildJs = gulp.src('src/js/**/*.js')
        .pipe(gulp.dest('dist/js'));

    var buildImages = gulp.src('src/images/**/*')
        .pipe(gulp.dest('dist/images'));

    var buildHtml = gulp.src('src/*.html')
        .pipe(gulp.dest('dist/'));

    done();
});
gulp.task('build', gulp.series('clean', 'sass', 'css-min' , 'script','script-jquary', 'build-dist'));

gulp.task('watch', function(){
    gulp.watch('src/scss/*.scss', gulp.parallel('sass'));
    gulp.watch('src/libs/**/*.js', gulp.parallel('script'));
    gulp.watch('src/*.html', gulp.parallel('html'));
    gulp.watch('src/js/*.js').on("change", browserSync.reload);
    gulp.watch('dist/*.html').on('change', browserSync.reload);
});

gulp.task('default', gulp.parallel('html', 'sass', 'css-min', 'script', 'browser-sync','watch'));