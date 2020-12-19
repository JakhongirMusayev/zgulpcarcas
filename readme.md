1. "Gulp"ning o'zi sozlandi, keyingi bosqich "pug" va boshqalarni sozlash.
   1.1. Izoh: "pug" va boshqalar sozlanmaganligi uchun hozircha vrladkada 'error' va stranitsada 'Cennot Get /' ko'rsatilmoqda.
2. 2-commit jarayonida 'let watch = gulp.parallel(build, browserSync);' 'build'ni qo'shish esimdan chiqqani uchun rosa vaqtim ketdi (Men 'pug'ni 'html'ga o'zgartirganimda xatolik yuz berdimi deb o'ylagandim, unday emas ekan).
   2.1. Izoh: 'pug' 'html'ga o'zgartirildi va 'html'ni bo'laklarga (\_header.html tashkil etildi) bo'lib ishlatish uchun 'gulp-file-include' o'rnatilib sozlandi.
   2.2. 'gulp-file-include'ning o'zida 'html'bibg bo'laklarini inobatga olmaslik yo'qligi uchun ('pug'ning o'zida bor) 'header.html' ''\_header.html'ga o'zgartirilib, 'gulpfile.js'da inkor etish operatoridan foydalanib 'index.html'dan boshqalarini kuzatmaslik (watch) joriy etildi.
3. Quyidagilar sozlandi:
   "del": "^6.0.0",
   "gulp-autoprefixer": "^7.0.1",
   "gulp-clean-css": "^4.3.0",
   "gulp-group-css-media-queries": "^1.2.2",
   "gulp-rename": "^2.0.0",
   "gulp-sass": "^4.1.0"
4. Quyidagilar sozlandi:
   "gulp-imagemin": "^7.1.0",
   "gulp-uglify-es": "^2.0.0",
   "gulp-webp": "^4.0.1",
   "gulp-webp-css": "^1.1.0",
   "gulp-webp-html": "^1.0.2"
   4.1. Fontlar bo'yicha muammolar bo'ldi, shuning uchun olib tashladim, hozircha.
   const ttf2woff = require('gulp-ttf2woff');
   const ttf2woff2 = require('gulp-ttf2woff2');
   const otf2ttf = require('gulp-fonter');
   // fonts
   function fonts() {
   src(path.src.fonts)
   .pipe(ttf2woff())
   .pipe(dest(path.build.fonts));
   return src(path.src.fonts)
   .pipe(ttf2woff2())
   .pipe(dest(path.build.fonts));
   }
   // Bir marta qo'lda (alohida) ishga tushuriladigan task
   gulp.task('otf2ttf', function () {
   return src([sourceFolder + '/fonts/*.otf'])
   .pipe(
   fonter({
   formats: ['ttf']
   })
   )
   .pipe(dest(sourceFolder + '/font/'))
   });
   let build = gulp.series(clean, gulp.parallel(html, css, javascript, fonts, images));
   exports.fonts = fonts;
