// 该配置文件帮助后处理css，stylus文件编译成css之后，
// 通过这里配置优化css代码，通过一系列plugin优化
// 比如：
// autoprefixer 自动加不同浏览器前缀

const autoprefixer = require('autoprefixer')


module.exports = {
    plugins : [
        autoprefixer()
    ]
}
