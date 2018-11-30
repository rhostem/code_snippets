/**
 * gulp tasks for pug, sass, js
 */
var path = require('path')
var gulp = require('gulp')
var browserSync = require('browser-sync')
var gutil = require('gulp-util')
var sass = require('gulp-sass')
var sourcemaps = require('gulp-sourcemaps')
var autoprefixer = require('gulp-autoprefixer')
var pug = require('gulp-pug')
var del = require('del')
var runSequence = require('run-sequence')
var rev = require('gulp-rev')
var revReplace = require('gulp-rev-replace')

var conf = {
  paths: {
    src: './src',
    dist: './public',
    js: {
      src: './src/js/*.js',
      dist: './public/assets',
    },
    sass: {
      src: './src/styles/*.scss',
      dist: './public/assets',
    },
    pug: {
      src: './src/page/**/*.pug',
      dist: './public',
    },
    rev: {
      manifest: './public',
    },
  },
  errorHandler: function(title) {
    return function(err) {
      gutil.log(gutil.colors.red('[' + title + ']'), err.toString())
      this.emit('end')
    }
  },
  sass: {
    process: {
      errLogToConsole: true,
      outputStyle: 'expanded',
      // outputStyle: 'compressed'
    },
    autoprefixer: {
      // https://github.com/ai/browserslist
      browsers: ['last 2 versions', '> 1% in KR', 'ie 6-8'],
      cascade: false,
    },
  },
}

/**
 *  Default task
 */
gulp.task('default', function() {
  runSequence(['pug', 'sass', 'js'], 'watch', 'serve')
})

gulp.task('pug', ['clean:html'], function buildHTML() {
  const pugErrHandler = conf.errorHandler('pug')
  return gulp
    .src(conf.paths.pug.src)
    .pipe(pug({ pretty: true }).on('error', pugErrHandler))
    .pipe(gulp.dest(conf.paths.pug.dist))
    .pipe(browserSync.reload({ stream: true }))
})

gulp.task('sass', ['clean:css'], function() {
  const sassErrHandler = conf.errorHandler('sass')
  gulp
    .src(conf.paths.sass.src)
    .pipe(sourcemaps.init()) // init sourcemaps
    .pipe(sass(conf.sass.process).on('error', sassErrHandler))
    .pipe(autoprefixer(conf.sass.autoprefixer))
    .pipe(sourcemaps.write('./map'))
    .pipe(gulp.dest(conf.paths.sass.dist))
    .pipe(browserSync.reload({ stream: true }))
})

gulp.task('js', ['clean:js'], function buildHTML() {
  const jsErrHandler = conf.errorHandler('js')
  return gulp
    .src(conf.paths.js.src)
    .pipe(gulp.dest(conf.paths.js.dist))
    .pipe(browserSync.reload({ stream: true }))
})

gulp.task('clean', function() {
  runSequence('clean:html', 'clean:js', 'clean:css')
})

gulp.task('clean:html', () =>
  del(['./public/page/**']).then(() => console.log('cleaning html completed.'))
)
gulp.task('clean:css', () =>
  del(['./public/assets/**/*.css']).then(() =>
    console.log('cleaning css completed.')
  )
)
gulp.task('clean:js', () =>
  del(['./public/assets/**/*.js']).then(() =>
    console.log('cleaning js completed.')
  )
)

gulp.task('revision', function() {
  return gulp
    .src(['public/assets/**/*.css', 'public/assets/**/*.js'])
    .pipe(rev())
    .pipe(gulp.dest('public/assets'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('public/assets'))
})

gulp.task('revReplace', ['revision'], function() {
  var manifest = gulp.src('./public/assets/rev-manifest.json')
  return gulp
    .src(conf.paths.dist + '/index.html')
    .pipe(revReplace({ manifest: manifest }))
    .pipe(gulp.dest(conf.paths.dist))
})

/**
 * open local server for livereload
 */
gulp.task('serve', function() {
  browserSync.instance = browserSync.init({
    startPath: '/',
    server: {
      baseDir: `${conf.paths.dist}`,
      directory: true,
    },
    port: 4000,
    open: false,
  })
})

/**
 * watch source files
 */
gulp.task('watch', function() {
  gulp.watch(path.join(conf.paths.src, '/**/*.pug'), ['pug'])

  gulp.watch(
    [
      path.join(conf.paths.src, '/**/*.scss'),
      path.join(conf.paths.src, '/**/*.sass'),
    ],
    ['sass']
  )

  gulp.watch([path.join(conf.paths.src, '/**/*.js')], ['js'])
})

gulp.task('reload', function() {
  browserSync.reload({ stream: true })
})

gulp.task('build', function() {
  runSequence(['pug', 'sass', 'js'])
  setTimeout(function() {
    gulp.start('revReplace')
  }, 1500)
})
