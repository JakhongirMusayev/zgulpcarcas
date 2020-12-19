// const { src } = require("gulp");
// sozdayom peremenniye i prisvaivayem im puti k papkam i failam. V peremenniyx dlya togo, chtobi esli nujno pomenyat imena papok, ne iskat vse mesta
// put k papke s resultatom raboty gulp-proyekta
let projectFolder = "dist";
// put k isxodnoy (dlya rasraboki) papke gulp-proyekta
let sourceFolder = "src";
// Sozdayom peremennuyu, kotoraya budet soderjat obekty, kotoriye v svoyu ochered budut xranit puti k razlichniym papkam i failam
let path = {
	// Object kuda budut viygrujani obrabotanniye gulpom faily
	build: {
		html: projectFolder + "/",
		css: projectFolder + "/css/",
		js: projectFolder + "/js/",
		fonts: projectFolder + "/fonts/",
		images: projectFolder + "/images/",
	},
	// Object s putyami k razrabatiyvaem papkam
	src: {
		// vaqtincha 'pug' o'rniga 'html' va 'gulp-file-include'dan foydalanib ko'rishga qaror qildim (2-commit jarayonida).
		// "!" + sourceFolder + "/*.html" - isklyuchayem fayliy nachinayushiesya s nijnim podcherkivaniyem. Takje ne zabiyvayem vnesti izmeneniya '@@include' v index.html fayle!
		html: [sourceFolder + "/*.html", "!" + sourceFolder + "/_*.html"],
		css: sourceFolder + "/scss/main.scss",
		js: sourceFolder + "/js/script.js",
		fonts: sourceFolder + "/fonts/**/*.{ttf,woff, woff2}",
		images: sourceFolder + "/images/**/*.{jpg,html,svg,gif,ico,webp}",
		// V 'fonts' i 'images' ukaziyvayem te rasshireniya kotoriyye my xotim ispolzovat, ne ukazanniyye rasshireniya budut ignorirovatsya.
	},
	// Object s putyami k papkam i failam, kotoriyx my doljni otlavlivat i slushat (watch) postoyanno
	watch: {
		html: sourceFolder + "/**/*.html",
		css: sourceFolder + "/scss/**/*.scss",
		js: sourceFolder + "/js/**/*.js",
		// fonts: sourceFolder + "/fonts/**/*.{ttf,woff, woff2}", // Shrifty postoyanno slushat ne obyazatelno
		images: sourceFolder + "/images/**/*.{jpg,html,svg,gif,ico,webp}",
	},
	// Object soderjashiy put k papke proyekta. Object, kotoriy udalyayet etu papku kajdiy raz dlya obnovleniya
	clean: "./" + projectFolder + "/"
}


// importlar
const { src, dest } = require('gulp');
const gulp = require('gulp');
const browsersync = require('browser-sync').create();
const fileinclude = require('gulp-file-include');
const del = require('del');
const scss = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const groupmediaqueries = require('gulp-group-css-media-queries'); // 'gulp-group-css-media-queries' - media-zaproslarni bitta joyga yig'ib, eng tagiga qo'yadi
const cleancss = require('gulp-clean-css'); // css fayllarni tozalaydi va siqadi (sjimayet)
const rename = require('gulp-rename'); // .min.css yoki .min.js uchun
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin'); // rasmlarni siqadi
const webp = require('gulp-webp'); // rasmlarni webp formatiga aylantiradi va yanada siqadi
const webphtml = require('gulp-webp-html'); // webp teglarini htmlga joylashtiradi
const webpcss = require('gulp-webp-css');



// Imya doljno otlichatsya ot peremennoy
function browserSync(params) {
	browsersync.init({
		server: {
			baseDir: "./" + projectFolder + "/"
		},
		port: 3000,
		notify: false // otklyuchyet vspliyvayushee okno ob obnovlenii stranitsy (chtobiy ne otvlekalo)
	})
}

function html() {
	// vozvrashat 'html' - kotoriy v - 'src', kotoriy ukazan v peremennoy 'path'
	return src(path.src.html)
		.pipe(fileinclude())
		.pipe(webphtml())
		.pipe(dest(path.build.html))
		.pipe(browsersync.stream());
}
function css() {
	return src(path.src.css)
		.pipe(
			scss({
				outputStyle: 'expanded'
			})
		)
		.pipe(groupmediaqueries())
		.pipe(
			autoprefixer({
				overrideBrowserslist: ['last 5 versions'],
				cascade: true
			})
		)
		.pipe(webpcss())
		.pipe(dest(path.build.css)) // Oldin birinchi: oddiy css fayl chiqaramiz (1)
		.pipe(cleancss()) // keyin tozalaymiz (2)
		.pipe(
			rename({
				extname: '.min.css'
			})
		) // boshqacha nomlaymiz (3)
		.pipe(dest(path.build.css)) // va ikkinchi: siqilgan hamda boshqa nomlangan css fayl chiqaramiz (4)
		.pipe(browsersync.stream());
}
// JavaScript
function javascript() {
	return src(path.src.js)
		.pipe(fileinclude())
		.pipe(dest(path.build.js))
		.pipe(uglify())
		.pipe(
			rename({
				extname: '.min.js'
			})
		)
		.pipe(dest(path.build.js))
		.pipe(browsersync.stream());
}

// images
function images() {
	return src(path.src.images)
		.pipe(
			webp({
				quality: 70
			})
		)
		.pipe(dest(path.build.images))
		.pipe(src(path.src.images))
		.pipe(
			imagemin({
				progressive: true,
				svgoPlugins: [{ removeViewBox: false }],
				interlaced: true,
				optimizationLevel: 3 // 0 to 7

			})
		)
		.pipe(dest(path.build.images))
		.pipe(browsersync.stream());
}
// Slejka za izmeneniyem faylov (Ne zabiyvayam dobavlyat v 'watch').
function watchFiles() {
	gulp.watch([path.watch.html], html);
	gulp.watch([path.watch.css], css);
	gulp.watch([path.watch.js], javascript);
	gulp.watch([path.watch.images], images);
}
// Ochistka (udaleniye) papki 'dist'
function clean() {
	return del(path.clean);
}



let build = gulp.series(clean, gulp.parallel(html, css, javascript, images));
// Kogda 'watch' - viypolnyayetsya 'browser-sync'. Shu yerda xato qilganman: 'browsersync' deganman, vaholanki u 'browserSync' nomli function ichida ishlatilgani uchun uning o'ziga emas, balki functionga murojaat qilishim kerak ekan!
let watch = gulp.parallel(build, watchFiles, browserSync);


exports.images = images;
exports.javascript = javascript;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch; // 'exports' - chtoby 'gulp' znal, ponimal i rabotal s peremenniymi
exports.default = watch; // Kogda zapuskayem proyekt po umolchaniyu budet viypolnyatsya 'watch', kotory v svoyu ochered budet zapuskat 'browser-sync'