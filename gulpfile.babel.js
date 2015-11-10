import gulp         from "gulp";
import path         from "path";
import cssnano      from "cssnano";
import immutableCss from "immutable-css";
import loadPlugins  from "load-plugins";

const $g = loadPlugins("gulp-*", { strip: "gulp" });
const $p = loadPlugins("postcss-*");


// configurations --------------------------------
const SRC_DIR       = path.join(__dirname, "./assets");
const DEST_DIR      = path.join(__dirname, "./static/assets");

const STYLES_DIR    = path.join(SRC_DIR, "styles");

const CSS_ENTRYPOINTS = ["style.css"].map(filename => path.join(STYLES_DIR, filename));


// styles --------------------------------
const processors = [
  $p.import(),
  $p.extend(),
  $p.mixins(),
  $p.nested(),
  $p.cssnext(),
  cssnano(),
  immutableCss(),
  $p.cssstats(),
  $p.reporter()
];

gulp.task("build:css", () => {
  return gulp.src(CSS_ENTRYPOINTS)
    .pipe($g.sourcemaps.init())
    .pipe($g.postcss(processors))
    .pipe($g.sourcemaps.write("."))
    .pipe($g.size())
    .pipe(gulp.dest(DEST_DIR));
});


gulp.task("build", ["build:css"]);
