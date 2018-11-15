var gulp        = require('gulp'),
    browserSync = require('browser-sync').create();
 
var projectdata = {
    "browsersync" : {
        "proxy" : "http://localhost/"
    },
    "watcher" : {
        "files" : [
            "*.html",   
        ]
    },
};


gulp.task('browser-sync', function(){
    browserSync.init({
        proxy   : projectdata.browsersync.proxy
    });
    
    gulp.watch(projectdata.watcher.files).on('change', browserSync.reload);
});
gulp.task('default', ['browser-sync']);