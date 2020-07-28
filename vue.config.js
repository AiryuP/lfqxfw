module.exports = {
    chainWebpack: config => {
        config
          .plugin('html')
          .tap(args => {
            args[0].title= '廊坊市公共气象服务'
            return args
          })
      }
}