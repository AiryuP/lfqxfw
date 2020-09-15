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
    //     target: 'http://192.168.1.109',
    //     secure: false,  // 如果是https接口，需要配置这个参数
    //     ws: true,//是否代理websockets
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // }
    // devServer: {
    //   port: 5000, // 改端口号
    //   open: false,
    //   proxy: {
    //     '/api': {
    //       // target: 'https://lfqx.sjztianyan.com/lfqxapi',
    //       target: 'http://192.168.1.109:8000',
    //       secure: false,  // 如果是https接口，需要配置这个参数
    //       ws: true,//是否代理websockets
    //       changeOrigin: true,
    //       pathRewrite: {
    //         '^/api': ''
    //       }
    //     }
    //   }
    // }
}