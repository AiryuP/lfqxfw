module.exports = {
    configureWebpack: {
      externals: {
        "BMap": "BMap",
        // "AMap": "AMap",
        // "$": 'jQuery'
      },
    },
    chainWebpack: config => {
      config
        .plugin('html')
        .tap(args => {
          args[0].title= '廊坊市公共气象服务'
          return args
        })
    },
    // proxy: {
    //   '/api': {
    //     target: '请求地址',
    //     secure: false,  // 如果是https接口，需要配置这个参数
    //     ws: true,//是否代理websockets
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // }
}