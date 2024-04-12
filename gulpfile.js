const { src, dest, watch, series } = require('gulp'); // npm install --save-dev gulp@4.0.2
const sass = require('gulp-sass')(require('sass')); // npm install --save-dev sass gulp-sass 
const postcss = require('gulp-postcss'); // npm install --save-dev gulp-postcss postcss
const autoprefixer = require('autoprefixer'); // npm install --save-dev autoprefixer
const imagemin = require('gulp-imagemin'); // npm install --save-dev gulp-imagemin@7.1.0
const webp = require('gulp-webp'); // npm install --save-dev gulp-webp@4.0.1
const avif = require('gulp-avif'); // npm install --save-dev gulp-avif
const sourcemaps = require('gulp-sourcemaps'); // npm install --save-dev gulp-sourcemaps
const cssnano = require('cssnano'); // npm install --save-dev cssnano



// Compile SASS files to CSS
const css = (done) => {
  src('./src/scss/**/*.scss') // Source files
    .pipe(sourcemaps.init()) // Initialize sourcemaps
    .pipe(sass({ outputStyle: 'expanded' })) // Compile SASS to CSS
    .pipe(postcss([autoprefixer(), cssnano()])) // Add vendor prefixes
    .pipe(sourcemaps.write('.')) // Write sourcemaps
    .pipe(dest('./build/css')); // Output folder
  done();
};



// Copy images to build folder
const imagenes = (done) => {
  src('./src/img/**/*')
    .pipe(imagemin({ optimizationLevel: 3 }))
    .pipe(dest('./build/img'));
  done();
}



// Convert images to WebP format
const versionWebp = (done) => {
  const opciones = {
    quality: 50
  }
  src('./src/img/**/*.{jpg,jpeg,png}')
    .pipe(webp(opciones))
    .pipe(dest('./build/img'));
  done();
}



// Convert images to AVIF format
const versionAvif = (done) => {
  const opciones = {
    quality: 50
  }
  src('./src/img/**/*.{jpg,jpeg,png}')
    .pipe(avif(opciones))
    .pipe(dest('./build/img'));
  done();
}



// Watch for changes in SASS files
const dev = () => {
  watch('./src/scss/**/*.scss', css);
  watch('./src/img/**/*', imagenes);
};


exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.default = series(imagenes, versionWebp, versionAvif, css, dev);

