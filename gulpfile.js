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
		html: sourceFolder + "/",
		css: sourceFolder + "/scss/main.scss",
		js: sourceFolder + "/js/script.js",
		fonts: sourceFolder + "/fonts/**/*.{ttf,woff, woff2}",
		images: sourceFolder + "/images/**/*.{jpg,pug,svg,gif,ico,webp}",
		// V 'fonts' i 'images' ukaziyvayem te rasshireniya kotoriyye my xotim ispolzovat, ne ukazanniyye rasshireniya budut ignorirovatsya.
	},
	// Object s putyami k papkam i failam, kotoriyx my doljni otlavlivat i slushat (watch) postoyanno
	watch: {
		html: sourceFolder + "/**/*.pug",
		css: sourceFolder + "/scss/**/*.scss",
		js: sourceFolder + "/js/**/*.js",
		// fonts: sourceFolder + "/fonts/**/*.{ttf,woff, woff2}", // Shrifty postoyanno slushat ne obyazatelno
		images: sourceFolder + "/images/**/*.{jpg,pug,svg,gif,ico,webp}",
	},
	// Object soderjashiy put k papke proyekta. Object, kotoriy udalyayet etu papku kajdiy raz dlya obnovleniya
	clean: "./" + projectFolder + "/"
}
// const { src, dest } = require('gulp');
const gulp = require('gulp');
const browsersync = require('browser-sync').create();



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
// Kogda 'watch' - viypolnyayetsya 'browser-sync'. Shu yerda xato qilganman: 'browsersync' deganman, vaholanki u 'browserSync' nomli function ichida ishlatilgani uchun uning o'ziga emas, balki functionga murojaat qilishim kerak ekan!
let watch = gulp.parallel(browserSync);
// 'exports' - chtoby 'gulp' znal, ponimal i rabotal s peremenniymi
exports.watch = watch;
// Kogda zapuskayem proyekt po umolchaniyu budet viypolnyatsya 'watch', kotory v svoyu ochered budet zapuskat 'browser-sync'
exports.default = watch;