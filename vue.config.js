const path = require('path')
console.log(__dirname)

module.exports = {
  // publicPath: '/static/build/',
  // outputDir: 'D:/phpStudy/Project/px_jvhe/public',
  // assetsDir: 'static/build',
  // indexPath: 'fiveyear/index.html',
  // outputDir: '/Users/lipengcheng/Documents/puxinGitLab/px_jvhe/public',
  // assetsDir: 'static/build',
  // indexPath: 'themes/simpleboot3/portal/index/index.html',
  publicPath: process.env.NODE_ENV === 'production' ? '/templates/partner/' : '/',
  chainWebpack: config => {
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => {
        // 修改它的选项...
        options.limit = 10000
        return options
      })
  },
  devServer: {
    // host: 'test.jjj.pxjy.com',
    // port: 80
    proxy: {
      '/partnercollage': {
        target: 'http://test.jvhe.pxjy.com/',
        changeOrigin: true,
        pathRewrite: {
          '^/partnercollage': '/partnercollage'
        }
      }
    }
  }
}
