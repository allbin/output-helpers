let gulp = require('gulp4');
let allbin = require('gulp-allbin');

let sourcemaps = require('gulp-sourcemaps');
let ts = require('gulp-typescript');
let babel = require('gulp-babel');
let tsProject = ts.createProject('./tsconfig.json');


// gulp.task('release', allbin.buildBumpPatchPush());
// gulp.task('release:minor', allbin.buildBumpMinorPush());
// gulp.task('release:major', allbin.buildBumpMajorPush());

gulp.task('build', function () {
    return gulp.src(['src/**/*.ts', 'src/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});

gulp.task('release:patch', allbin.tagAndPush(["package.json", "dist"], "patch"));
gulp.task('release:minor', allbin.tagAndPush(["package.json", "dist"], "minor"));
gulp.task('release:major', allbin.tagAndPush(["package.json", "dist"], "major"));

gulp.task('buildAndReleasePatch', gulp.series('build', 'release:patch'));
gulp.task('buildAndReleaseMinor', gulp.series('build', 'release:minor'));
gulp.task('buildAndReleaseMajor', gulp.series('build', 'release:major'));