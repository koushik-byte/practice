const { src, dest, series, parallel, watch } = require('gulp');
const nunjucksRender = require('gulp-nunjucks-render');
const data = require('gulp-data');
const sass = require('gulp-sass')(require('sass'));
// del v8+ is ESM-only; use dynamic import for deleteAsync
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const path = require('path');

const paths = {
  templates: {
    pages: 'src/templates/pages/**/*.njk',
    watch: 'src/templates/**/*.njk',
    src: 'src/templates',
  },
  styles: {
    src: 'src/assets/css/**/*.scss',
    main: 'src/assets/css/main.scss',
    dest: 'dist/assets/css'
  },
  scripts: {
    src: 'src/assets/js/**/*.js',
    dest: 'dist/assets/js'
  },
  images: {
    src: 'src/assets/images/**/*',
    dest: 'dist/assets/images'
  },
  static: {
    src: 'src/static/**/*',
    dest: 'dist'
  },
  dist: 'dist'
};

function clean() {
  return import('del').then(({ deleteAsync }) => deleteAsync([paths.dist]));
}

function html() {
  return src(paths.templates.pages)
    .pipe(plumber())
    .pipe(data(() => ({
      // put global data here if needed
    })))
    .pipe(nunjucksRender({
      path: [paths.templates.src]
    }))
    .pipe(dest(paths.dist))
    .pipe(browserSync.stream());
}

function styles() {
  return src(paths.styles.main)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

function scripts() {
  return src(paths.scripts.src)
    .pipe(dest(paths.scripts.dest))
    .pipe(browserSync.stream());
}

function images() {
  return src(paths.images.src)
    .pipe(dest(paths.images.dest));
}

function staticFiles() {
  return src(paths.static.src, { allowEmpty: true })
    .pipe(dest(paths.static.dest));
}

function serve() {
  browserSync.init({
    server: {
      baseDir: paths.dist
    },
    open: false
  });

  watch(paths.templates.watch, html);
  watch(paths.styles.src, styles);
  watch(paths.scripts.src, scripts);
  watch(paths.images.src, images);
  watch(paths.static.src, staticFiles);
}

const build = series(
  clean,
  parallel(styles, scripts, images, staticFiles, html)
);

exports.clean = clean;
exports.html = html;
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.static = staticFiles;
exports.build = build;
exports.default = series(build, serve);
