const path = require('path')
var nodeExternals = require('webpack-node-externals');

module.exports = {
  vendor: false,
  filename: {
   js: 'vue2-leaflet-canvas.js',
   css: 'vue2-leaflet-canvas.css',
   images: 'assets/images/[name].ext',
   fonts: 'assets/fonts/[name].ext',
   chunk: '[id].chunk.js'
  },
  webpack: {
    resolve: {
      alias: {vue: 'vue/dist/vue.js'}
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
    },
    externals: [
      //nodeExternals(),
      {'leaflet': 'L'},
    ]
  }
}
