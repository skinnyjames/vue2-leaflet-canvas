var nodeExternals = require('webpack-node-externals');

module.exports = {
  webpack: {
    resolve: {
      alias: {vue: 'vue/dist/vue.js'}
    },
    externals: [
      nodeExternals(),
      {'leaflet': 'L'},
      //{'leaflet.markercluster': {root: ['leaflet', 'markercluster']}}
    ]
  }
}
