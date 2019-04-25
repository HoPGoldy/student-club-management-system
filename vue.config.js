const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir)
}

// vue.config.js
module.exports = {
  // 选项...
  baseUrl: './',
  chainWebpack: (config)=>{
    //修改文件引入自定义路径
    config.resolve.alias
        .set('@', resolve('src'))
        .set('common', resolve('src/components/general'))
        .set('image', resolve('src/images'))
    }
}