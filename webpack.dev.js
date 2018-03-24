const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const localIp = require('my-local-ip')();
 
console.log(`Loacal IP is ${localIp}`);
module.exports = merge(common, {   
  devtool: 'inline-source-map',
  devServer: {
    host: localIp,
    hot: true
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
});