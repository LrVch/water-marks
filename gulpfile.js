/* --------- plugins --------- */

var gulp = require("gulp"),
	browserSync = require("browser-sync").create(),
	sass = require('gulp-sass'),
	notify = require('gulp-notify'),
	minifyCss = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	autoprefixer = require('gulp-autoprefixer'),
	del = require("del"),
	gutil = require("gulp-util"),
	concatCss = require("gulp-concat-css"),
	gulpif = require("gulp-if"),
	uglify = require("gulp-uglify"),
	imagemin = require("gulp-imagemin"),
	uncss = require('gulp-uncss'),
	filter = require("gulp-filter"),
	ftp = require("vinyl-ftp"),
	wiredep = require("wiredep").stream,
	useref = require("gulp-useref"),
	size = require("gulp-size"),
	compass = require('gulp-compass'),
	jade = require('gulp-jade'),
	plumber = require('gulp-plumber'),
	spritesmith = require('gulp.spritesmith');
// До выхода gulp 4 версии временное решение
//runSequence = require('run-sequence'),

/* --------- paths --------- */

var
	paths = {
		jade: {
			location: 'app/markups/**/*.jade',
			compiled: 'app/markups/_pages/*.jade',
			destination: './app'
		},

		scss: {
			location: 'app/styles/**/*.scss',
			entryPoint: 'app/css/main.css'
		},

		compass: {
			configFile: 'config.rb',
			cssFolder: 'app/css',
			scssFolder: 'app/styles',
			imgFolder: 'app/img'
		},

		browserSync: {
			baseDir: './app',
			watchPaths: ['app/*.html', 'app/css/*.css', 'app/js/*.js']
		}
	}

/* --------- jade --------- */

gulp.task('jade', function () {
	gulp.src(paths.jade.compiled)
		.pipe(plumber())
		.pipe(jade({
			pretty: '\t',
		}))
		.pipe(gulp.dest(paths.jade.destination));
});

/* --------- scss-compass --------- */

gulp.task('compass', function () {
	gulp.src(paths.scss.location)
		.pipe(plumber())
		.pipe(compass({
			config_file: paths.compass.configFile,
			css: paths.compass.cssFolder,
			sass: paths.compass.scssFolder,
			image: paths.compass.imgFolder
		}));
});

/* --------- browser sync --------- */

gulp.task('sync', function () {
	browserSync.init({
		server: {
			baseDir: paths.browserSync.baseDir
		}
	});
});

/* --------- watch --------- */

gulp.task('watch', function () {
	gulp.watch(paths.jade.location, ['jade']);
	gulp.watch(paths.scss.location, ['compass']);
	gulp.watch(paths.browserSync.watchPaths).on('change', browserSync.reload);
});

/* --------- default --------- */

gulp.task('default', ['jade', 'compass', 'sync', 'watch']);

// * ====================================================== *
//   BUILD
// * ====================================================== *


// Переносим CSS JS HTML в папку DIST (useref)
// ******************************************************
gulp.task("useref", function () {
	var assets = useref.assets();
	return gulp.src("./app/*.html")
		.pipe(assets)
		.pipe(gulpif("*.js", uglify()))
		.pipe(gulpif("*.css", minifyCss({
			compatibility: "ie8"
		})))
		.pipe(assets.restore())
		.pipe(useref())
		.pipe(gulp.dest("./dist"));
});

// autoprefixer
// ******************************************************
gulp.task('autoprefixer', function () {
	return gulp.src("./dist/css/style.min.css")
		.pipe(autoprefixer({
			browsers: ['last 6 versions', "ie 8"],
			cascade: false
		}))
		.pipe(gulp.dest("./dist/css"));
});

// Очищаем директорию DIST
// ******************************************************
gulp.task("clean-dist", function () {
	return del("./dist");
});

// Запускаем локальный сервер для DIST
// ******************************************************
gulp.task("dist-server", function () {
	browserSync.init({
		port: 2000,
		open: false,
		notify: false,
		server: {
			baseDir: "./dist"
		}
	});
});

// Перенос шрифтов
// ******************************************************
gulp.task("fonts", function () {
	gulp.src("./app/fonts/*")
		.pipe(filter(["*.eot", "*.svg", "*.ttf", "*.woff", "*.woff2"]))
		.pipe(gulp.dest("./dist/fonts/"))
});

// Перенос картинок
// ******************************************************
gulp.task("images", function () {
	return gulp.src("./app/img/*")
		.pipe(imagemin({
			progressive: true,
			interlaced: true
		}))
		.pipe(filter(["*.jpg", "*.svg", "*.jpeg", "*.png", "*.webp", "*.gif"]))
		.pipe(gulp.dest("./dist/img/"));
});

// Перенос остальных файлов (php)
// ******************************************************
gulp.task("php", function () {
	return gulp.src("./app/php/**/*")
		//.pipe(filter(["php/*"]))
		.pipe(gulp.dest("./dist/php"));
});


// Перенос остальных файлов (favicon)
// ******************************************************
gulp.task("favicon", function () {
	return gulp.src("./app/favicon/**/*")
		//.pipe(filter(["php/*"]))
		.pipe(gulp.dest("./dist/favicon"));
});

// Вывод размера папки APP
// ******************************************************
gulp.task("size-app", function () {
  return gulp.src("./app/**/*").pipe(size({
    title: "APP size: "
  }));
});

// Сборка и вывод размера папки DIST
// ******************************************************
gulp.task("dist", ["useref", "images", "fonts", "php", "favicon", "size-app"], function () {
  return gulp.src("./dist/**/*").pipe(size({
    title: "DIST size: "
  }));
});


// Собираем папку DIST - только когда файлы готовы
// ******************************************************
gulp.task("build", ["clean-dist"], function () {
  gulp.start("dist");
});