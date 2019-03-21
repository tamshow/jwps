"use strict";

const gulp = require('gulp');
const changed = require('gulp-changed');
const plumber = require('gulp-plumber');
const runSequence = require('run-sequence');

const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const csso = require('gulp-csso');

const browserSync = require('browser-sync');
const reload = browserSync.reload;
const stream = browserSync.stream;

const replace = require('gulp-replace');
const concat = require('gulp-concat');
const del = require('del');
const prettify = require('gulp-prettify');
const uglifyjs = require('uglify-js');
const minifier = require('gulp-uglify');

const workboxBuild = require('workbox-build');

const nunjucksRender = require('gulp-nunjucks-render');


//書き出し先変更
const DEST = '../html';

//docs
const DOCS = '../docs';

// js
//=================

//結合
const jsFileBundle = [
  'source/assets/src/bundle/**/*.js'
];
gulp.task('js:bundle', () => {
  return gulp.src(jsFileBundle).pipe(concat('bundle.js'))
      .pipe(gulp.dest('source/assets/js/'));
});

// const jsFileVendor = [
//   'source/assets/src/vendor/**/*.js'
// ];
// gulp.task('js:vendor', () => {
//   return gulp.src(jsFileVendor).pipe(concat('vendor.js'))
//       .pipe(gulp.dest('source/assets/js/'));
// });


gulp.task('js:no-bundle', () => {
  return gulp.src([
    'source/assets/src/**/*.js',
    '!source/assets/src/bundle/**/*.js'
   // '!source/assets/src/vendor/**/*.js'
  ])
    .pipe(gulp.dest('source/assets/js/'));
});



//css
//=================
gulp.task('css', () => {
  const CSSRC = [
    'source/assets/sass/bundle.scss'
  ];
  const CSSDEST = 'source/assets/css/';
  const browsers = ['last 2 versions', 'ie >= 9', 'iOS >= 9', 'Android >= 4.4'];

  return gulp.src(CSSRC)
      .pipe(plumber())
      .pipe(changed(CSSDEST))
      .pipe(sass.sync({
        outputStyle: 'expanded',
        precision: 10
      }).on('error', sass.logError))
      .pipe(postcss([
        require('autoprefixer')({browsers: browsers}),
        require('css-mqpacker')({sort: false})
      ]))
      .pipe(gulp.dest(CSSDEST));
});

gulp.task('css:plugin', () => {
  const CSSPRC = [
    'source/assets/sass/plugin/*.scss'
  ];
  const CSSPDEST = 'source/assets/css/plugin/';

  return gulp.src(CSSPRC)
      .pipe(plumber())
      .pipe(changed(CSSPDEST))
      .pipe(sass.sync({}).on('error', sass.logError))
      .pipe(gulp.dest(CSSPDEST));
});



//html
//静的サイトジェネレーター
gulp.task('nunjucks', () => {
  
  return gulp.src([
    'source/**/*.njk',
    '!source/**/_*.njk'
  ])
      .pipe(nunjucksRender({
        path: ['source/'],
        envOptions: {
          autoescape: false
        }
      }))
      .pipe(gulp.dest('source/'));
});



//確認用書き出し
//=================
gulp.task('html', (callback) => {
  runSequence(
      'css',
      'css:plugin',
      //'js',
      'js:bundle',
      'js:no-bundle',
      //'js:vendor',
      'nunjucks',
      callback);
});


//ローカルサーバーを立ち上げる
//=================
gulp.task('server', () => {
  browserSync({
    port: 9000,
    startPath: '/filelist.html',
    open: 'false',
    server: {
      baseDir: './source'
    }
  });
});


//html ローカルサーバーを立ち上げる
//=================
gulp.task('server:html', () => {
  browserSync({
    port: 9090,
    startPath: '/index.html',
    open: 'false',
    server: {
      baseDir: '../html'
    }
  });
});




//変更を監視する
//=================

gulp.task('serve', ['html', 'server'], () => {

  //js
  gulp.watch([
    'source/assets/src/**/*.js'
  ], ['js:bundle','js:no-bundle']);

  //css
  gulp.watch([
    'source/assets/sass/**/*{.scss,.sass}'
  ], ['css','css:plugin']);

  //html
  gulp.watch([
    'source/**/*.njk'
  ], ['nunjucks']);

});



//========================================================================
// 書き出し
//========================================================================



//削除する
//=================
gulp.task('build:clean:all', () => {
  return del([
    DEST + '/'
  ],{force: true});
});

//移動する
//=================
gulp.task('build:move', () => {
  return gulp.src([
    'source/**/*',
    '!source/_other/**/*',
    '!source/_layout/**/*',
    '!source/_partials/**/*',
    '!source/assets/_other/**/*',
    '!source/assets/vue/**/*',
    '!source/assets/sass/**/*',
    '!source/assets/src/**/*'
  ])
      .pipe(gulp.dest(DEST + '/'));
});


//削除する
//=================
gulp.task('build:clean', () => {
  return del([
    DEST + '/**/*.njk',
    DEST + '/_layout/',
    DEST + '/_partials/',
    DEST + '/_other/',
    DEST + '/assets/_other/',
    DEST + '/assets/vue/',
    DEST + '/assets/sass/',
    DEST + '/assets/src/'
  ],{force: true});
});


//cssの圧縮する
//==================
gulp.task('build:css:min', () => {
  return gulp.src([
    DEST + '/assets/css/**/**/*.css'
  ])
      .pipe(plumber())
      .pipe(csso())
      .pipe(gulp.dest(DEST + '/assets/css/'));
});


//jsの圧縮する
//==================
gulp.task('build:js:min', () => {
  return gulp.src([
    DEST + '/assets/js/**/*.js'
  ])
      .pipe(plumber())
      .pipe(minifier({ output:{comments: /^!/}}))
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
      'build:js:min',
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
    '!source/assets/_other/**/*',
    '!source/assets/vue/**/*',
    '!source/assets/sass/**/*',
    '!source/assets/src/**/*'

  ])
      .pipe(gulp.dest(DOCS + '/assets/'));
});


//パスの置換 + htmlの移動
gulp.task('docs:move:replace', () => {
  gulp.src(['source/styleguide/**/*'])
      .pipe(replace('="/', '="'))
      .pipe(gulp.dest(DOCS + '/'));
});


//
//==================
gulp.task('docs', (callback) => {
  runSequence(
      'docs:clean',
      'docs:move:assets',
      'docs:move:replace',
      callback);
});



//========================================================================
// swを実行
//========================================================================

//https://developers.google.com/web/tools/workbox/modules/workbox-build
gulp.task('sw', () => {
  return workboxBuild.generateSW({
    globDirectory: 'build',
    globPatterns: [
      '**/*.{html,js,css}'
    ],
    runtimeCaching: [
      {
        urlPattern: /\/$/,
        handler: 'cacheFirst',

        options: {
          cacheName: 'cacheName',
          expiration: {
            maxEntries: 5,
            maxAgeSeconds: 60,
          },
        }
      }
    ],

    swDest: 'build/sw.js'
  });
});



