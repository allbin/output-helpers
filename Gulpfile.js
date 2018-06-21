let gulp = require('gulp4');
let allbin = require('gulp-allbin');


gulp.task('release', allbin.buildBumpPatchPush());
gulp.task('release:minor', allbin.buildBumpMinorPush());
gulp.task('release:major', allbin.buildBumpMajorPush());