"use strict";

var gulp = require("gulp"),
    uglify = require("gulp-uglify"),
    cssmin = require("gulp-cssmin"),
    gulpIf = require("gulp-if"),
    del = require("del"),
    concat = require("gulp-concat"),
    less = require("gulp-less"),
    replace = require('gulp-replace'),
    CacheBuster = require('gulp-cachebust'),
    cachebust = new CacheBuster(),
    ngAnnotate = require('gulp-ng-annotate'),
    isDev = false;

var STATIC_FOLDER = "../src/main/resources/";

var BUNDLE = {
    BASE: "app/bundle",
    JS: "app.js",
    CSS: "app.css"
};

var LOCATION = {
    MAIN_JS: STATIC_FOLDER + "static/js/",
    MAIN_CSS: STATIC_FOLDER + "static/css/",
    UI_JS: "app/**/*.js",
    UI_CSS: "app/css/**/*",
    UI_MAIN_CSS: "app/css/main.css",
    UI_MAIN_LESS: "app/less/styles.less",
    UI_RESULT_LESS: "app/css/styles.css",
    UI_LESS: "app/less/**/*",
    UI_LESS_DESTINATION: "app/css/",
    MAIN_TEMPLATES: STATIC_FOLDER + "static/templates/",
    UI_TEMPLATES: "app/templates/**/*",
    FONTS_AWESOME: STATIC_FOLDER + "static/fonts/font-awesome",
    FONTS_GLYPHICONS: STATIC_FOLDER + "static/fonts/glyphicons"
};

//--------------------------------------------------------------------------------------

gulp.task("clean.bundle", function () {
    return del(BUNDLE.BASE + "/**/*");
});

gulp.task("clean.bundle.js", function () {
    return del(BUNDLE.BASE + "/**/*.js");
});

gulp.task("clean.bundle.css", function () {
    return del(BUNDLE.BASE + "/**/*.css");
});

gulp.task("cache.bust.js", function () {
    return gulp.src(BUNDLE.BASE + "/" + BUNDLE.JS)
        .pipe(cachebust.resources())
        .pipe(gulp.dest(LOCATION.MAIN_JS));
});

gulp.task("cache.bust.css", function () {
    return gulp.src(BUNDLE.BASE + "/" + BUNDLE.CSS)
        .pipe(cachebust.resources())
        .pipe(gulp.dest(LOCATION.MAIN_CSS));
});

gulp.task("cache.bust", gulp.series("cache.bust.js", "cache.bust.css"));

gulp.task("clean.fonts", function () {
    return del(STATIC_FOLDER + "public/assets/fonts/**/*", {force: true});
});

gulp.task("fonts.awesome", function () {
    return gulp.src(["bower_components/font-awesome/fonts/**"])
        .pipe(gulp.dest(LOCATION.FONTS_AWESOME));
});

gulp.task("fonts.glyphicons", function () {
    return gulp.src(["bower_components/glyphicons/fonts/**"])
        .pipe(gulp.dest(LOCATION.FONTS_GLYPHICONS));
});

gulp.task("build.fonts", gulp.series("clean.fonts", "fonts.awesome", "fonts.glyphicons"));

gulp.task("clean.less", function () {
    return del(LOCATION.UI_RESULT_LESS);
});

gulp.task("compress.less", function() {
    return gulp.src(LOCATION.UI_MAIN_LESS)
            .pipe(less())
            .pipe(gulpIf(!isDev, cssmin()))
            .pipe(gulp.dest(LOCATION.UI_LESS_DESTINATION));
});

gulp.task("clean.js", function () {
    return del(LOCATION.MAIN_JS + "/**/*.js", {force: true});
});

gulp.task("compress.js", function () {
    return gulp.src([
        "bower_components/jquery/dist/jquery.js",
        "bower_components/angular/angular.js",
        "bower_components/angular-route/angular-route.js",
        "bower_components/angular-animate/angular-animate.js",
        "bower_components/angular-route-segment/build/angular-route-segment.js",
        "bower_components/angular-bootstrap/ui-bootstrap-tpls.js",
        'bower_components/iCheck/icheck.js',
        "bower_components/skylo/vendor/scripts/skylo.js",
        "bower_components/pnotify/dist/pnotify.js",
        "bower_components/pnotify/dist/pnotify.buttons.js",
        "bower_components/pnotify/dist/pnotify.nonblock.js",
        "bower_components/angular-resource/angular-resource.js",
        LOCATION.UI_JS
    ])
        .pipe(concat("app.js"))
        .pipe(ngAnnotate())
        .pipe(gulpIf(!isDev, uglify()))
        .pipe(gulp.dest(BUNDLE.BASE))
});

gulp.task("clean.css", function () {
    return del(LOCATION.MAIN_CSS + "/**/*.css", {force: true});
});

gulp.task("compress.css", function () {
    return gulp.src([
        "bower_components/font-awesome/css/font-awesome.min.css",
        "bower_components/glyphicons/styles/glyphicons.css",
        "bower_components/iCheck/skins/minimal/_all.css",
        "bower_components/angular-bootstrap/ui-bootstrap-csp.css",
        "bower_components/pnotify/dist/pnotify.css",
        "bower_components/pnotify/dist/pnotify.buttons.css",
        LOCATION.UI_RESULT_LESS,
        LOCATION.UI_MAIN_CSS
    ])
        .pipe(concat("app.css"))
        .pipe(replace('../fonts/fontawesome', '../fonts/font-awesome/fontawesome'))
        .pipe(replace('../fonts/glyphicons', '../fonts/glyphicons/glyphicons'))
        .pipe(replace("url(blue.png)", "url(../img/blue.png)"))
        .pipe(replace("url(blue@2x.png)", "url(../img/blue@2x.png)"))
        .pipe(gulpIf(!isDev, cssmin()))
        .pipe(gulp.dest(BUNDLE.BASE));
});

gulp.task("clean.html", function() {
    return del(LOCATION.MAIN_TEMPLATES + "**/*", {force: true});
});

gulp.task("replace.html", function() {
    return gulp.src(LOCATION.UI_TEMPLATES)
        .pipe(cachebust.references())
        .pipe(gulp.dest(LOCATION.MAIN_TEMPLATES));
});

gulp.task("move.js", function () {
    return move(BUNDLE.JS, LOCATION.MAIN_JS);
});

gulp.task("move.css", function () {
    return move(BUNDLE.CSS, LOCATION.MAIN_CSS);
});

gulp.task("move", gulp.series("move.js", "move.css"));

gulp.task("watch", function () {
    gulp.watch([LOCATION.UI_CSS + ".css", "!" + LOCATION.UI_RESULT_LESS, LOCATION.UI_LESS], gulp.series("clean.bundle.css", "clean.css", "clean.less", "compress.less", "compress.css", "move.css"));
    gulp.watch(LOCATION.UI_JS + ".js", gulp.series("clean.bundle.js", "clean.js", "compress.js", "move.js"));
    gulp.watch(LOCATION.UI_TEMPLATES, gulp.series("clean.html", "replace.html"));
});

gulp.task('build', gulp.series("clean.bundle", "clean.css", "clean.less", "clean.js", "clean.html", "build.fonts", "compress.less", "compress.css", "compress.js", "replace.html", "move"));

// gulp.task("build.prod", gulp.series("clean.bundle", "clean.js", "clean.css", "clean.less", "clean.html", "build.fonts", "compress.js", "compress.less", "compress.css", "cache.bust", "replace.html"));

gulp.task("default", gulp.series("build"));

//--------------------------------------------------------------------------------------

function move(fileName, dest) {
    return gulp.src(BUNDLE.BASE + "/" + fileName)
        .pipe(gulp.dest(dest));
}
