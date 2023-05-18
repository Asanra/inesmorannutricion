const {series} = require('gulp');
const gulp = require('gulp'),
    clean = require('gulp-clean'),
    uglify = require('gulp-uglify'),
    autoPrefixer = require('gulp-autoprefixer'),
    htmlMin = require('gulp-htmlmin'),
    cleanCss = require('gulp-clean-css'),
    browser  = require('browser-sync'),
    imagemin = require('gulp-imagemin'), //OJO, version 8 da problemas
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    cachebust = require('gulp-cache-bust'),
    fs = require('fs'),
    ttf2woff2 = require('ttf2woff2');

    let files = {
        src: [
            'src/app.webmanifest',
            'src/CNAME',
            'src/favicon.ico',
            'src/README.md',
            'src/robots.txt',
            'src/doc*/**/*',
            'src/fonts*/**/*',
            'src/img*/icons/**/*'
        ]
    };

    let fonts = { // Para convertir ttf fonts
      input: [
        fs.readFileSync('fonts-ttf/Source_Sans_Pro/SourceSansPro-Regular.ttf'),
        fs.readFileSync('fonts-ttf/Source_Sans_Pro/SourceSansPro-Bold.ttf')
      ],
      output: [
        'src/fonts/Source_Sans_Pro/SourceSansPro-Regular.woff2',
        'src/fonts/Source_Sans_Pro/SourceSansPro-Bold.woff2'
      ]
    };


/* Limpia todo el directorio dist */
function cleaner() {
    return gulp.src(['dist'])
            .pipe(clean());
}

/* Copia el resto de archivos que no se procesan en otra tarea */
async function processFiles() {
    files.src.forEach(item => gulp.src(item).pipe(gulp.dest('dist')));
}


/* Convierte fonts ttf => woff2 */
async function convertFonts() {
  fonts.input.forEach(function(item, i) {
    fs.writeFileSync(fonts.output[i], ttf2woff2(fonts.input[i]));
  });
}

/* Minificación de archivos html */
function processHtml() {
    return gulp.src('src/*.html')
            .pipe(htmlMin({collapseWhitespace: true}))
            .pipe(gulp.dest('dist'));
}

/* Optimización de imágenes */
function processImg() {
    return gulp.src('src/img/*.+(png|jpeg|jpg|gif|svg)')
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
            .pipe(gulp.dest('dist/img'));
}

/* Cambio automático de rutas a los nuevos archivos css.
   También concatena y minifica el código */
function processRef() {
  return gulp.src(['src/*.html'])
          .pipe(useref({searchPath: './src'}))
          .pipe(gulpif('*.css', cleanCss()))
          .pipe(gulpif('*.css', autoPrefixer()))
          .pipe(gulp.dest('dist'));
}

/* Control de versiones de archivos para caché */
function processHash() {
    return gulp.src(['dist/**/*.html'])
            .pipe(cachebust({type: 'timestamp'}))
            .pipe(gulp.dest('dist'));
}

/* Lanzamos un navegador para ver cambios en html */
function server() {
  browser.init({
    watch: true,
    server: {
      baseDir: 'src'
    },
  });
}

/* Ejecutamos - gulp clean - para limpiar carpeta dist */
exports.clean = cleaner;

/* Ejecutamos - gulp server - para lanzar navegador */
exports.server = server;

/* Ejecutamos - gulp convertFonts - para lanzar convertFonts */
exports.convertFonts = convertFonts;

/* Ejecutamos - gulp - para lanzar serie de tareas de empaquetación */
exports.default = series(processFiles, processImg, processRef, processHash);

