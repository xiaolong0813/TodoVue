// 导入Vue组件，和定义的app.vue文件
import Vue from 'vue'
import App from './app.vue'

// 引入全局样式
import './assets/styles/global.styl'

// 以下为测试用
// // 导入图片和css样式。这里css中也指定了背景图片。依然可以被处理
// import './assets/styles/test.css'
// import './assets/images/bg.jpg'
// // 写好的stylus可以导入
// import './assets/styles/test-stylus.styl'

// 创建root以便于挂载vue app对象
const root = document.createElement('div')
document.body.appendChild(root)

// mount可以把Vue内扩展挂载到root上
// 因为app.vue是一个组件，不能直接挂载到html内，需要挂载

// 创建Vue对象，h参数是Vue里面的CreateElement参数
new Vue ({
    render: (h) => h(App),
}).$mount(root)

// render: (h) => h(App) 箭头函数，等价于：
// render: function (createElement) {
//     return createElement(App);
// }
// createElement 是vue中一个函数，作用是生成一个VNode节点
// render函数得到节点后，返回给mount函数，渲染成Dom节点，挂载到root
