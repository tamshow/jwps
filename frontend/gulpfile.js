"use strict";

const gulp = require('gulp');
const changed = require('gulp-changed');
const plumber = require('gulp-plumber');
const runSequence = require('run-sequence');

const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const csso = require('gulp-csso');
const packageImporter = require('node-sass-package-importer');

const browserSync = require('browser-sync');
const reload = browserSync.reload;
const stream = browserSync.stream;
const connectSSI   = require('connect-ssi');

const webpackStream = require("webpack-stream");
const webpack = require("webpack");
const webpackConfig = require("./webpack.config");

const del = require('del');
const prettify = require('gulp-prettify');
const uglifyjs = require('uglify-js');
const minifier = require('gulp-uglify');


//書き出し先変更
const DEST = 'build';

//docs
const DOCS = '../docs';


// js
//=================

gulp.task("js", () => {
  return webpackStream(webpackConfig, webpack)
      .pipe(plumber())
      .pipe(gulp.dest('source/assets/js'));
});

gulp.task('js:not-bundle', () => {
  return gulp.src([
    'source/assets/src/@jwps/accordion/accordion.js',
    'source/assets/src/@jwps/allcheck/allcheck.js',
    'source/assets/src/@jwps/base/base.js',
    'source/assets/src/@jwps/form/form.js',
    'source/assets/src/@jwps/modal/modal.js',
    'source/assets/src/@jwps/newslist/newslist.js',
    'source/assets/src/@jwps/opennav/opennav.js',
    'source/assets/src/@jwps/pagescroll/pagescroll.js',
    'source/assets/src/@jwps/ripple/ripple.js',
    'source/assets/src/@jwps/tabs/tabs.js'
  ])
      .pipe(gulp.dest('source/assets/js/not-bundle/'));
});

gulp.task('js:use', () => {
  return gulp.src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/lodash/lodash.js',
    'node_modules/swiper/dist/swiper.jquery.js',
    'node_modules/moment/moment.js'
  ])
      .pipe(gulp.dest('source/assets/js/use/'));
});



//css
//=================
gulp.task('css', () => {
  const CSSRC = [
    'source/assets/sass/base.scss'
  ];
  const CSSDEST = 'source/assets/css/';
  const browsers = ['last 2 versions', 'ie >= 9', 'iOS >= 9', 'Android >= 4.4'];

  return gulp.src(CSSRC)
      .pipe(plumber())
      .pipe(changed(CSSDEST))
      .pipe(sass.sync({
        outputStyle: 'expanded',
        precision: 10,
        importer: packageImporter({
          extensions: ['.sass', '.scss', '.css']
        })
      }).on('error', sass.logError))
      .pipe(postcss([
        require('autoprefixer')({browsers: browsers}),
        require('css-mqpacker')({sort: false})
      ]))
      .pipe(gulp.dest(CSSDEST));
});


//確認用書き出し
//=================
gulp.task('html', (callback) => {
  runSequence(
      'css',
      'js',
      'js:not-bundle',
      'js:use',
      callback);
});


//ローカルサーバーを立ち上げる
//=================
gulp.task('server', () => {
  browserSync({
    port: 9000,
    startPath: '/index.html',
    open: 'false',
    server: {
      baseDir: './source',
      middleware: [
        connectSSI({
          baseDir: __dirname + '/source',
          ext: '.html'
        })
      ]
    }
  });
});



//変更を監視する
//=================

gulp.task('serve', ['html', 'server'], () => {

  //js
  gulp.watch([
    'source/assets/src/**/*.js'
  ], ['js']);

  //css
  gulp.watch([
    'source/assets/sass/**/*{.scss,.sass}'
  ], ['css']);


});



//========================================================================
// 書き出し
//========================================================================



//削除する
//=================
gulp.task('build:clean:all', () => {
  return del([
    DEST + '/assets/css/',
    DEST + '/assets/form/',
    DEST + '/assets/iconfont/',
    DEST + '/assets/img/',
    DEST + '/assets/js/'
  ],{force: true});
});

//移動する
//=================
gulp.task('build:move', () => {
  return gulp.src([
    'source/assets/**/*',
    '!source/assets/sass/**/*',
    '!source/assets/src/**/*'
  ])
      .pipe(gulp.dest(DEST + '/assets/'));
});


//削除する
//=================
gulp.task('build:clean', () => {
  return del([
    DEST + '/assets/sass/',
    DEST + '/assets/src/'
  ],{force: true});
});


//cssの圧縮する
//==================
gulp.task('build:css:min', () => {
  return gulp.src([
    DEST + '/assets/css/**/*.css'
  ])
      .pipe(plumber())
      .pipe(csso())
      .pipe(gulp.dest(DEST + '/assets/css/'));
});


//jsの圧縮する
//==================
gulp.task('build:js:min', () => {
  const options = {preserveComments: 'license'};
  return gulp.src([
    DEST + '/assets/js/**/*.js'
  ])
      .pipe(plumber())
      .pipe(minifier(options, uglifyjs))
      .pipe(gulp.dest(DEST + '/assets/js/'));
});



//実行
//==================
gulp.task('build', (callback) => {
  runSequence(
      'html',
      'build:clean:all',
      'build:move',
      'build:clean',
      //'build:js:min',
      'build:css:min',
      callback);
});




//========================================================================
// docsへコピー
//========================================================================




//削除する
//=================
gulp.task('docs:clean', () => {
  return del([
    DOCS + '/'
  ],{force: true});
});

//移動する
//=================
gulp.task('docs:move:assets', () => {
  return gulp.src([
    'source/assets/**/*',
    '!source/assets/js-form/**/*',
    '!source/assets/sass/**/*',
    '!source/assets/src/**/*'
  ])
      .pipe(gulp.dest(DOCS + '/assets/'));
});

gulp.task('docs:move:html', () => {
  return gulp.src([
    'source/styleguide/**/*'
  ])
      .pipe(gulp.dest(DOCS + '/'));
});



//
//==================
gulp.task('docs', (callback) => {
  runSequence(
      'docs:clean',
      'docs:move:assets',
      'docs:move:html',
      callback);
});





