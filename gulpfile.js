'use strict';
//plugins
var gulp           = require('gulp'),
    browserSync    = require('browser-sync'),
    uglify         = require('gulp-uglify'),
    sass           = require('gulp-sass'),
    autoprefixer   = require('gulp-autoprefixer'),
    cssmin         = require('gulp-minify-css'),
    imagemin       = require('gulp-imagemin'),
    pngquant       = require('imagemin-pngquant'),
    svgSprites     = require('gulp-svg-sprite'),
    svgmin         = require('gulp-svgmin'),
    rigger         = require('gulp-file-include'),
    sourcemaps     = require('gulp-sourcemaps'),
    watch          = require('gulp-watch'),
    concat         = require('gulp-concat'),
    rimraf         = require('rimraf'),
    order          = require('gulp-order'),
    reload         = browserSync.reload;

//patch config
var theme = './';
// for WP
// var theme = './wp-content/themes/teampapertheme';
var path = {
  src: {
    root: "src",
    html: theme + 'src/**/*.html',
    sass: theme + 'src/scss',
    img: theme + 'src/img',
    upload: theme + 'src/upload',
    svg: theme + 'src/img/svg',
    fonts: theme + 'src/fonts',
    js: theme + 'src/js'
  },
  dest: {
    html: theme + 'dist',
    css: theme + 'dist/css',
    img: theme + 'dist/img',
    js: theme + 'dist/js',
    upload: theme + 'dist/upload',
    svg: theme + 'dist/img/',
    fonts: theme + 'dist/fonts',
  },
  watch: {
    html: theme + 'src/**/*.html',
    js: theme + 'src/js',
    sass: theme + 'src/scss/**/*.scss',
    img: theme + 'src/img/**/*.*',
    upload: theme + 'src/upload/**/*.*',
    svg: theme + 'src/img/svg/**/*.svg',
    fonts: theme + 'src/fonts/**/*.*'
  },
  clean: './dist'
};

//server config
var config = {
    server: {
        baseDir: "./dist"
    },
    tunnel: false,
    host: 'localhost',
    port: 9000,
    logPrefix: "hs"
    // for WP
    // browserSync.init({
    //   notify: false,
    //   proxy: 'http://yourLocalSite:8888/'
    // });
};

//webserver
gulp.task('webserver', function () {
    browserSync(config);
});

//clean function
gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

//html build
gulp.task('build:html', function () {
    gulp.src(path.src.root + '/*.html') 
    .pipe(rigger()) 
    .pipe(gulp.dest(path.dest.html))
    .pipe(reload({stream: true})); 
});

//sass build
gulp.task('build:sass', function () {
  gulp.src(path.src.sass + '/**/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(cssmin()) 
  .pipe(sourcemaps.write('./map'))
  .pipe(gulp.dest(path.dest.css))
  .pipe(reload({stream: true}));
});

//js build
gulp.task('build:js', function () {
  gulp.src(path.src.js + '/script.js')
  .pipe(uglify())
  .pipe(gulp.dest(path.dest.js))
    .pipe(reload({stream: true})); 
});

//library js build
gulp.task('build:libs', function () {
  gulp.src(path.src.js + '/libs/**/*.js')
  .pipe(order([
      'jquery.js',
      'modernizr.js',
      'slick.js'
    ]))
  .pipe(concat('libs.js'))
  .pipe(uglify())
  .pipe(gulp.dest(path.dest.js))
  .pipe(reload({stream: true}));
});

//images build
gulp.task('build:img', function () {
    gulp.src(path.src.img + '/**/*') 
    .pipe(imagemin({ 
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()],
        interlaced: true
    }))
    .pipe(gulp.dest(path.dest.img)) 
    .pipe(reload({stream: true}));
});

//svg min 
gulp.task('build:svgmin', function() {
  return gulp.src(path.src.svg)
    .pipe(svgmin({
      plugins: [{
        removeAttrs: {attrs: ['fill', 'fill-rule']}
      }]
    }))
    .pipe(gulp.dest(path.build.svg));
});
//svg symbol 
gulp.task('build:svg', function() {
  gulp.src(path.src.svg + '/**/*.svg')
    .pipe(svgSprites({
      shape: {
        dimension: {
          precision: 2
          // attributes: true
        }
      },
      mode: {
        symbol: {
          bust: false,
          dest: '../',
          sprite: 'img/symbol-sprite.svg'
        }
      }
    }))
    .pipe(gulp.dest(path.dest.svg))
    .pipe(reload({stream: true}));
});

//upload's files build
gulp.task('build:upload', function () {
    gulp.src(path.src.upload + '/**/*') 
    .pipe(imagemin({ 
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()],
        interlaced: true
    }))
    .pipe(gulp.dest(path.dest.upload))
    .pipe(reload({stream: true}));
});

//fonts build
gulp.task('build:fonts', function () {
  gulp.src(path.src.fonts + '/**/*')
  .pipe(gulp.dest(path.dest.fonts))
  .pipe(reload({stream: true}));
});

//build function
gulp.task('build', [
  'build:html',
  'build:sass',
  'build:js',
  'build:libs',
  'build:fonts',
  'build:img',
  'build:upload',
  'build:svg'
]);

//watch function
gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('build:html');
    });
    watch([path.watch.sass], function(event, cb) {
        gulp.start('build:sass');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('build:js');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('build:img');
    });
    watch([path.watch.upload], function(event, cb) {
        gulp.start('build:upload');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('build:fonts');
    });
    watch([path.watch.svg], function(event, cb) {
        gulp.start('build:svg');
    });
});

//default function
gulp.task('default', ['build', 'webserver', 'watch']);
