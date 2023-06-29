import gulp from "gulp";
import plumber from "gulp-plumber"
import sass from "gulp-dart-sass";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import csso from "postcss-csso";
import rename from "gulp-rename";
import browserSync from "browser-sync";


// Styles

export const styles = () => {
    return gulp.src('source/sass/style.scss', { sourcemaps: true })

    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
        autoprefixer(),
        csso()
    ]))
    .pipe(rename("style.min.css"))

    .pipe(gulp.dest('source/css/', { sourcemaps: "." }))
    .pipe(browserSync.stream())
}

// Server

export const serve = (done) => {
    browserSync.init({
        server: {
            baseDir: 'source'
        },
        cors: true,
        notify: false,
        ui: false,
    });
    done();
};

export const reload = (done) => {
    browserSync.reload();
    done();
};

// Watcher

export const watcher = () => { 
    gulp.watch('source/sass/**/*.scss', gulp.series(styles)); 
    gulp.watch("source/*.html", gulp.series(reload)); 
  };

export default gulp.series (
 styles, serve, watcher
);
