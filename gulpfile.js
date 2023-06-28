import gulp from "gulp";
import plumber from "gulp-plumber"
import sass from "gulp-dart-sass";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import csso from "postcss-csso";
import rename from "gulp-rename";
import browserSync from "browser-sync";


// Styles

const buildStyles = () => {
    return gulp.src('source/sass/style.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
        autoprefixer(),
        csso()
    ]))
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest('source/css/style.css'))
}

// Server

const serve = () => {
    browserSync.init({
        server: {
            baseDir: 'source'
        }
    });
}

// Watcher

const watcher = () => {
    gulp.watch('source/sass/**/*.scss', ['sass']);
    gulp.watch('source/*.html').on('change', browserSync.reload);
}

export default gulp.series (
 buildStyles, serve , watcher
);
