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
// 用于非js代码部分打包，从boundle.js中单独拿出打包成静态资源文件，
// 用于生产环境,单独做浏览器缓存
const ExtractPlugin = require('extract-text-webpack-plugin')

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
        // filename在开发环境下可以直接使用随意值，但生产环境需要chunk hash。这个不能在dev下使用
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
            // {
            //   这里没有用到css文件，都是stylus形式。所以不需要
            //     test: /\.css$/,
            //     // 使用css-loader和style-loader依次对css文件进行处理
            //     // 按照数组中从后往前的顺序。
            //     // use 可以接受数组使用多个loader
            //     use: ['style-loader', 'css-loader']
            // },
            // css预处理器，即使用模块化的方式写css，而不是在原生.css文件，也可以用
            // webpack进行功能配置.
            // 这里使用css预处理器stylus，后缀名.styl.
            // 这里先使用stylus-loader处理styl文件成css文件
            // 再递给上级css-loader处理。
            // 在assets/styles里面新建styl文件
            // 需要先安装stylus-loader和stylus
            // {
            //   这里需要根据环境区分。在后面进行环境的判断并更改
            //     test: /\.styl/,
            //     use: [
            //         'style-loader',
            //         'css-loader',
            //         // postcss 过程，option的配置指
            //         // stylus-loader会生成sourceMap，
            //         // 后续postcss可以直接使用而不用再次生成
            //         // 注意这个要在stylus-loader前面
            //         {
            //             loader: "postcss-loader",
            //             options: {
            //                 sourceMap: true
            //             }
            //         },
            //         'stylus-loader',
            //     ]
            // },

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
    // 对于stylus文件，在开发环境不用分离打包，可以直接使用以下配置
    config.module.rules.push({
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
    })
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
else {
    // 设置生产环境的入口，将类库和业务代码拆分打包
    config.entry = {
        app : path.join(__dirname, 'src/index.js'),
        // commons 声明的类型是单独打包成文件的，如果有其他如vue-route之类也可以写在里面
        // 会将这种类库代码写到commons.[hashcode].js文件里
        commons : ['vue']
    }
    // 生产环境中filename不能是和开发一样是boundle.js，需要使用chunkhash值
    config.output.filename = '[name].[chunkhash:8].js'
    // 设置拆分打包配置。webpack 4 以上需要此配置代替之前的插件
    config.optimization = {
        splitChunks : {
            // 可以自己设置一组一组的cache group来配对应的共享模块
            cacheGroups: {
                // commons里面的name就是生成的共享模块bundle的名字,对应entry
                commons: {
                    name: "commons",
                    // chunks 有三个可选值，”initial”, “async” 和 “all”.
                    // 分别对应优化时只选择初始的chunks，所需要的chunks 还是所有chunks
                    chunks: "initial",
                    // minChunks 是split前，有共享模块的chunks的最小数目 ，默认值是1
                    minChunks: 2
                }
            }
        },
        // 将js代码中webpack相关的代码，包括webpack连接应用，加载等过程的部分，打包到
        // 一个单独的运行文件。
        // 比如，把包含chunks映射关系的list单独从app.js中提取，比如在todo.vue中
        // 打包后除了业务代码，还有一些被webpack赋予这个chunk的id，以及映射的代码部分。在
        // 往这个chunk前面加入模块的时候，webpack会赋予新的id，后面的todo.vue的id也会改变
        // 如果不提取，此todo.vue就会每次也发生改变，缓存就失效了
        runtimeChunk : {
            name: entrypoint => `manifest.${entrypoint.name}`
        }
    }
    // 生产环境下，stylus文件需要单独打包
    config.module.rules.push({
        test: /\.styl/,
        // 下面通过css-loader将css部分单独写到css文件里
        // style-loader在css文件外包裹js代码，用于将样式写入
        // html的style标签里面。这部分分离得话就没用了，所以use
        // 中不再用style-loader
        use: ExtractPlugin.extract({
            fallback: 'style-loader',
            use : [
                // 'style-loader',
                'css-loader',
                {
                    loader: "postcss-loader",
                    options: {
                        sourceMap: true
                    }
                },
                'stylus-loader',
            ]
        })

    })
    // 生产环境下需要的插件
    config.plugins.push(
        // 指定输出静态css文件的名字。contentHash会根据css文件内容进行hash，得到单独的值
        // webpack 4 中包含了contentHash:8，ExtracPlugin中不能再用，使用下面值
        new ExtractPlugin('style.[md5:contenthash:hex:8].css'),
        // 用于分离类库和业务代码文件的CommonsChunkPlugin在webpack 4已经弃用
        // 需要用splitChunks
        // new webpack.optimize.CommonsChunkPlugin()
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


