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
