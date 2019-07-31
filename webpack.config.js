// 帮助打包前端资源，js，css，图片等。
// 基本包path，处理路径
// 运行了npm run build之后，就会将所有资源打包成指定的boundle.js(里面包含了vue的源码).
// 打包成一个文件可以减少http请求
// 模块化：将可以复用的资源打包，避免多次修改

const path = require('path')
// js需要html作为入口被引用。引入下面插件
const HTMLPlugin = require('html-webpack-plugin')
// 引入webpack以使用DefinePlugin
const webpack = require('webpack')

// 判断是否为dev。build的时候启动package.json中的变量名都包含在process.env里面
const isDev = process.env.NODE_ENV === "development"

// vue-loader 15的版本需要再添加plugin的配置，
// 一个方法在webpack.config.js 添加如下配置， 一个是vue-loader 降级
const VueLoaderPlugin = require('vue-loader/lib/plugin')

// 为方便后面加入属性，这里用变量名替代
const config = {
    // 编译目标。是web应用
    target: "web",
    // entry声明入口,即index.js
    // __dirname代表文件所在地址，也就是根目录
    // join可以拼接路径
    entry: path.join(__dirname, 'src/index.js'),
    // 出口,webpack 根据输入的文件，即entry中指定的，
    // 把里面所有依赖的文件，比如vue，及app，打包成boundle.js
    // 可以直接在浏览器运行。
    output: {
        filename: "boundle.js",
        path: path.join(__dirname, 'dist')
    },
    // 导入插件。
    plugins: [
        new VueLoaderPlugin(),
        new HTMLPlugin(),
        // webpack编译过程中，以及自定义的js代码中判断当前环境，可以调用process.env进行判断
        // 这里引用了即可在js中引用。另外vue会根据不同环境进行区分打包。dist目录中有不同版本vue
        // 源码，开发版本会较齐全但复杂。生产环境较轻便
        new webpack.DefinePlugin({
            'process.env' : {
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        })
    ],
    module: {
        // 规则
        rules: [
            {
                // test 是检测文件类型，用的是正则,下面表示以.vue为结尾的文件
                // 下面声明loader，就可以处理该类型文件
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            // jsx类型文件用babel-loader进行操作
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            // 配置css预处理器
            // css-loader:只负责加载css模块,不会将加载的css样式应用到html
            // style-loader:负责将css-loader加载到的css样式动态的添加
            // 到html-head-style标签中，以js代码的形式出现
            {
                // 正则匹配所有以.css结尾的文件
                test: /\.css$/,
                // 使用css-loader和style-loader依次对css文件进行处理
                // 按照数组中从后往前的顺序。
                // use 可以接受数组使用多个loader
                use: ['style-loader', 'css-loader']
            },
            // css预处理器，即使用模块化的方式写css，而不是在原生.css文件，也可以用
            // webpack进行功能配置.
            // 这里使用css预处理器stylus，后缀名.styl.
            // 这里先使用stylus-loader处理styl文件成css文件
            // 再递给上级css-loader处理。
            // 在assets/styles里面新建styl文件
            // 需要先安装stylus-loader和stylus
            {
                test: /\.styl/,
                use: [
                    'style-loader',
                    'css-loader',
                    // postcss 过程，option的配置指
                    // stylus-loader会生成sourceMap，
                    // 后续postcss可以直接使用而不用再次生成
                    // 注意这个要在stylus-loader前面
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    'stylus-loader',
                ]
            },

            // 图片。在src/assets/images里面放一些图片
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [
                    // 以对象的形式传入loader，可以用options指定其操作方式
                    // 如limit，因为url-loader会将图片转换为base64代码写在js里面
                    // 对于小的图片很有用。这里定义小于1024大小就会转译为代码
                    // name是输出的名字，[name]是进来的名字，ext是扩展名
                    // url-loader依赖于file-loader，都需要安装
                    // build之后，会在dist里面生成name-output样式的图片
                    {
                        loader: "url-loader",
                        options: {
                            limit: 1024,
                            name : '[name]-output.[ext]'

                        }
                    }
                ]
            }
        ]
    }
}

// 该配置文件需要同时用于开发环境和正式环境，需要判断当前是什么环境
// 引入一个环境变量NODE_ENV，标识是正式还是开发环境。需要首先安装cross-env
// 不同平台设置env方法是不同的，用这个包可以忽略平台

// 如果当前是开发环境，即development，可以进行一些和开发有关的配置.在启动的时候会
// 读取package.json 中的变量，即NODE_ENV的值。可以根据值进行一些不同环境下的配置

if (isDev) {
    // devtool帮助在页面调试代码。因为在浏览器中的是经过编译的
    // .vue文件的为es6代码，无法直接阅读，可以使用source map进行映射，
    // 以便读取真正编写的代码。有不同设置，下面这种为推荐形式
    config.devtool = '#cheap-module-eval-source-map'
    // 如果开发环境，配置dev server相关：
    // port：启动服务的监听端口。
    // 本地host，这里设置为0.0可以通过localhost，以及本机的内网ip也可以访问。比如其他内网电脑，或者手机
    // overlay：编译的过程中如果有错误，可以显示到网页上。
    // 启动之后使用localhost:8000访问
    config.devServer = {
        port : 8000,
        host : '0.0.0.0',
        overlay : {
            errors: true,
        },
        // 将没有映射的地址映射到index.html
        // historyApiFallback
        // 热部署。修改组件代码，只会重新渲染该组件，而不会重新加载整个页面
        hot: true
    }
    // 为使用hot，需要加一些插件
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        // 减少一些不需要的信息展示，一般需要加上
        new webpack.NoEmitOnErrorsPlugin()
    )
}

module.exports = config




// 1. webpack的四个核心概念: entry-入口,output-出口,loader-加载器,plugins-插件
//  前面打包和输出文件使用了entry和output
// 2. 之前说过Webpack只能处理js和Json格式的文件,所以css,图片这些不是webpack能
// 直接处理的资源.这里就用到了loader-加载器,如:css,图片都有其对应的loader加载器
// 3. 在webpack的世界里,一切皆为模块.加载器的作用是将类似css这种webpack不能处理
// 的文件转化为其可以处理的模块
// 4. 官方文档给出里webpack加载css文件的解决方法,使用css对应的loader
// 使用css-loader和style-loader两个加载器来处理css文件
// 5. 处理图片可以引入url-loader
// 6. postcss 一种对css编译的工具，类似babel对js的处理，常见的功能如：
//      1) 使用下一代css语法
//      2) 自动补全浏览器前缀
//      3) 自动把px代为转换成rem
//      4) css 代码压缩等等
// 7. babel : Babel 是一个 JavaScript 编译器.主要用于将 ECMAScript 2015+ 版本的
// 代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。包括：
//      1) 语法转换。可以转换jsx语法！
//      2) 通过 Polyfill 方式在目标环境中添加缺失的特性 (通过 @babel/polyfill 模块)
//      3) 源码转换 (codemods)
//

//


