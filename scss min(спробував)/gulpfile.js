const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass')); // Підключення Dart Sass
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();

// Компіляція SASS у CSS
gulp.task('sass', function () {
    return gulp.src('scss/**/*.scss', { allowEmpty: true }) // Додано allowEmpty
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest('css')) // Шлях, куди зберегти CSS
        .pipe(cleanCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream());
});

// Запуск сервера та слідкування за змінами
gulp.task('serve', function () {
    browserSync.init({
        server: './'
    });

    gulp.watch('scss/**/*.scss', gulp.series('sass')); // Слідкування за SASS файлами
    gulp.watch('*.html').on('change', browserSync.reload); // Слідкування за HTML файлами
});

// Завдання за замовчуванням
gulp.task('default', gulp.series('sass', 'serve'));