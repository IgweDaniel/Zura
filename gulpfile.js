const { series, src, dest, watch } = require("gulp");

const terser = require("gulp-terser"),
  concat = require("gulp-concat"),
  sass = require("gulp-sass"),
  babel = require("gulp-babel"),
  browserify = require("browserify"),
  source = require("vinyl-source-stream"),
  buffer = require("vinyl-buffer"),
  log = require("gulplog"),
  sourcemaps = require("gulp-sourcemaps"),
  reactify = require("reactify");

const browserSync = require("browser-sync").create();

sass.compiler = require("node-sass");

function compileSass() {
  return src("src/sass/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(dest("build/css"))
    .pipe(browserSync.stream());
}

function fonts() {
  return src("src/assets/**")
    .pipe(dest("build/assets/"))
    .pipe(browserSync.stream());
}

function js() {
  const b = browserify({
    entries: "./src/js/index.js",
    debug: true,
    transform: [
      [
        "babelify",
        {
          presets: ["@babel/preset-env"],
        },
      ],
    ],
  });
  return b
    .bundle()
    .pipe(source("./src/js/index.js"))
    .pipe(buffer())
    .pipe(concat("script.js"))
    .pipe(dest("./build/script"))
    .pipe(browserSync.stream());
}

exports.default = function () {
  browserSync.init({
    server: "./build",
  });

  watch("src/assets/**", fonts);
  watch("src/sass/**/*.scss", compileSass);

  watch("src/js/*.js", js);
  watch("./build/*.html", { events: "all" }, (cb) => {
    browserSync.reload();
    cb();
  });
};
