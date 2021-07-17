var concat = require('concat');
const fs = require('fs');

concat([
  './dist/angular-demo/main.js',
  './dist/angular-demo/polyfills.js',
  './dist/angular-demo/runtime.js',
],
  './dist/angular-demo.js'
);

fs.copyFile('./dist/angular-demo/styles.css', './dist/angular-demo.css', (err) => { if (err) throw err; });

console.info('Custom elements created successfully!');
