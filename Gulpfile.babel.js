import gulp from 'gulp';
import clean from 'gulp-clean';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import mocha from 'gulp-mocha';

gulp.task('clean', () => {
    let read = false;

    return gulp.src('fetch-api.min.js', { read }).
        pipe(clean());
});

gulp.task('compress', ['clean'], () => {
    return gulp.src('fetch-api.js').
        pipe(uglify()).
        pipe(rename((path) => { path.basename = `${path.basename}.min` })).
        pipe(gulp.dest('.'));
});

gulp.task('test', () => {
    let ui = 'tdd';
    let reporter = 'nyan';

    return gulp.src('test.js').
        pipe(mocha({ ui, reporter }));
});

gulp.task('build', ['clean', 'compress']);
gulp.task('default', ['test']);
