<!--html 代码-->
<template>
<!--    <div id="test">{{text}}</div>-->
<!--    独立外部包裹节点.不能在template下面直接放置并行的元素
        必须要有个外部包裹-->
    <div id="app">
<!--        用于背景虚化-->
        <div id="cover"></div>
<!--        这里Header是自声明的组件，如果是header就和html标签冲突-->
<!--        会优先使用html标签-->
        <Header></Header>
<!--        html里面没有todo标签，小写也可以-->
        <todo></todo>

        <Footer></Footer>
    </div>

</template>

<!--ts代码-->
<script>
    // 注意这里要写.vue后缀，否则按照在webpack.config.js中定义无法找到.vue文件
    import Header from './todo/header.vue'
    import Footer from './todo/footer.jsx'
    import Todo from './todo/todo.vue'

    export default {
        name: "todoApp",
        // 声明使用该组件，这样就可以在template中使用该组件
        components : {
            Header,
            Footer,
            Todo,
        }
    }

    // export default {
    //     // name: "app",
    //     // 作为function return初始化数据
    //     data() {
    //         return {
    //             text : "abc"
    //         }
    //     }
    // }
</script>

<!--该组件css样式-->
<!--需要language指定所写style代码类型-->
<!--scope 可以使样式代码只在此组件生效，其他地方相同的名称不影响-->
<style lang="stylus" scoped>
    /*#test {*/
    /*    color: red;*/
    /*}*/
    #app {
        position: absolute
        left:0
        right:0
        top:0
        bottom:0
    }
    #cover {
        position: absolute
        left:0
        right:0
        top:0
        bottom:0
        background-color: #999
        opacity:.6
        z-index: -1
    }
</style>
