const
    gulp = require('gulp'),
    scss = require('gulp-sass'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    autoprefixer = require('gulp-autoprefixer'),
    spritesmith = require("gulp.spritesmith"),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload;

gulp
    .task('browser-sync', () => {
        browserSync.init({
            server: {
                baseDir: ""
            }
        });
    })
    .task('sprite', () => {
        gulp.src('src/img/sprites/*.png')
            .pipe(spritesmith({
                imgName: 'sprite.png',
                cssName: 'sprite.css'
            }))
            .pipe(gulp.dest('src/img/sprites'));
    })
    .task('imagemin', () =>
        gulp.src('src/img/*')
            .pipe(imagemin())
            .pipe(gulp.dest('img'))
    )
    .task('scss', () => {
        gulp.src('src/scss/**/*.scss')
            .pipe(scss({
                outputStyle: 'compressed'
            }))
            .pipe(autoprefixer({
                cascade: false
            }))
            .pipe(gulp.dest('css'))
            .pipe(reload({stream: true}));
    })
    .task('vendor', () => {
        gulp.src([
            'src/js/vendor/angular.min.js',
            'src/js/vendor/deps/**/*.js'
        ])
            .pipe(concat('vendor.js'))
            .pipe(uglify())
            .pipe(gulp.dest('js'))
            .pipe(reload({stream: true}));
    })
    .task('js', () => {
        gulp.src('src/js/app/**/*.js')
            .pipe(babel({
                presets: ['es2015']
            }))
            .pipe(concat('main.js'))
            .pipe(uglify())
            .pipe(gulp.dest('js'))
            .pipe(reload({stream: true}));
    })
    .task('watch', ['vendor', 'js', 'scss', 'browser-sync'], () => {
        gulp.watch('src/scss/**/*.scss', ['scss']);
        gulp.watch('src/js/vendor/**/*.js', ['vendor']);
        gulp.watch('src/js/app/**/*.js', ['js']);
        gulp.watch("**/*.html").on('change', browserSync.reload);
    });