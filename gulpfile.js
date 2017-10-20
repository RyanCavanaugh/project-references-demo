const gulp = require('gulp');
const del = require('del');
const exec = require('child_process').execFileSync;

function compileProject(name) {
    return function () {
        try {
            exec("node", ["C:/github/TypeScript/built/local/tsc.js", "-p", name]);
        } catch (e) {
            console.log(e.output.toString());
        }
    }
}

gulp.task('clean', () => {
    del("lib/*");
});

gulp.task('core', compileProject("core"));
gulp.task('animals', compileProject("animals"));
gulp.task('zoo', compileProject("zoo"));
