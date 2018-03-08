const path = require('path');

module.exports = {
  entry: './js/main.js',
  output: {
    filename: 'prod.js',
    path: path.resolve(__dirname, 'dist')
  }
};