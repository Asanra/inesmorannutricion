const {series} = require('gulp');
const gulp = require('gulp'),
    browser  = require('browser-sync'),
    imagemin = require('gulp-imagemin'), //OJO, version 8 da problemas
    fs = require('fs'),
    ttf2woff2 = require('ttf2woff2');

    let fonts = { // Para convertir ttf fonts
      input: [
        fs.readFileSync('fonts-ttf/Source_Sans_Pro/SourceSansPro-Regular.ttf'),
        fs.readFileSync('fonts-ttf/Source_Sans_Pro/SourceSansPro-Bold.ttf')
      ],
      output: [
        'fonts/Source_Sans_Pro/SourceSansPro-Regular.woff2',
        'fonts/Source_Sans_Pro/SourceSansPro-Bold.woff2'
      ]
    };


/* Convierte fonts ttf => woff2 */
async function convertFonts() {
  fonts.input.forEach(function(item, i) {
    fs.writeFileSync(fonts.output[i], ttf2woff2(fonts.input[i]));
  });
}

/* Optimización de imágenes */
function processImg() {
    return gulp.src('img/*.+(png|jpeg|jpg|gif|svg)')
            .pipe(imagemin(([
                imagemin.gifsicle({interlaced: true}),
                imagemin.mozjpeg({quality: 75, progressive: true}),
                imagemin.optipng({optimizationLevel: 5}),
                imagemin.svgo({
                    plugins: [
                        {removeViewBox: false},
                        {cleanupIDs: false}
                    ]
                })
            ])))
            .pipe(gulp.dest('img'));
}

/* Lanzamos un navegador para ver cambios en html */
function server() {
  browser.init({
    watch: true,
    server: {
      baseDir: '/'
    },
  });
}

/* Ejecutamos - gulp server - para lanzar navegador */
exports.server = server;

/* Ejecutamos - gulp convertFonts - para lanzar convertFonts */
exports.convertFonts = convertFonts;

/* Ejecutamos - gulp processImg - para lanzar processImg */
exports.processImg = processImg;
