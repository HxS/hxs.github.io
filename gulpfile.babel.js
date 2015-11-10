import gulp         from "gulp";
import path         from "path";
import cssnano      from "cssnano";
import immutableCss from "immutable-css";
import loadPlugins  from "load-plugins";
import del          from "del";
import runSequence  from "run-sequence";

const $g = loadPlugins("gulp-*", { strip: "gulp" });
const $p = loadPlugins("postcss-*");


// configurations --------------------------------
const SRC_DIR       = path.join(__dirname, "./assets");
const TEMP_DIR      = path.join(__dirname, "./static");
const DEST_DIR      = path.join(__dirname, "./public");

const STYLES_DIR    = path.join(SRC_DIR, "styles");

const CSS_ENTRYPOINTS = ["style.css"].map(filename => path.join(STYLES_DIR, filename));

const CLEAN_TARGET_DIRS = [
  TEMP_DIR,
  path.join(DEST_DIR, "*"),
  `!${path.join(DEST_DIR, ".git")}`
];

const COPY_TARGET_FILES = [
  path.join(SRC_DIR, "*")
];

const DEPLOY_OPTIONS = {
  branch: "master"
};


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
    .pipe(gulp.dest(TEMP_DIR));
});

gulp.task("watch:css", () => {
  gulp.watch(path.join(STYLES_DIR, "**/*.css"), ['build:css']);
});


// misc --------------------------------
gulp.task("clean", () => del(CLEAN_TARGET_DIRS, {dot: true}))

gulp.task("build:copy", () => {
  return gulp.src(COPY_TARGET_FILES, {dot: true, nodir: true})
    .pipe(gulp.dest(TEMP_DIR))
    .pipe($g.size({title: "copy"}));
});

gulp.task("build:hugo", $g.shell.task("hugo"))
gulp.task("serve", $g.shell.task("hugo server"))
gulp.task("watch:hugo", $g.shell.task("hugo server -ws ."))

gulp.task("build", ["clean"], (callback) => {
  runSequence(
    ["build:copy", "build:css"],
    "build:hugo",
    callback
  );
});

gulp.task("watch", ["watch:css", "watch:hugo"]);

gulp.task("deploy", ["build"], () => {
  return gulp.src(path.join(DEST_DIR, "**/*"))
    .pipe($g.ghPages(DEPLOY_OPTIONS));
});
