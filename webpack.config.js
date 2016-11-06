var autoprefixer = require('autoprefixer');
module.exports = {
  entry: './index.jsx',

  output: {
    filename: 'bundle.js',
    publicPath: '/'
  },

  module: {
    loaders: [
      { 
        test: /\.jsx$/, 
        exclude: /node_modules/, 
        loader: 'babel-loader?presets[]=es2015&presets[]=react' 
      },
      {  
        test: /\.scss$/,
        loader: 'style!css!postcss!sass'
      }
    ]
  },
  postcss: [ autoprefixer({browsers: ['last 2 versions']})]
}