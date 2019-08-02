<template>
    <section class="real-app">
<!--        autofocus-自动选中-->
<!--        placeholder-默认文字-->
<!--        @绑定标识keyup事件，@=v-on：-->
<!--        修饰符enter，只有输入回车，才会执行后面方法-->
        <input
        type="text"
        class="add-input"
        autofocus="autofocus"
        placeholder="接下去要做什么？"
        @keyup.enter="addTodo">

<!--        将todo数据绑定到item组件的属性todoProp上-->
<!--        <item :todoProp="todo"></item>-->

        <!--        循环读取todos的数据并渲染到元素中-->
<!--        绑定该item的id为key,将todo传给item组件的todoProp属性-->
<!--        这里监听item组件传过来的del事件，进行响应操作，事件参数为该item的id-->
<!--        这里要展示的是过滤后的todos列表-->
        <item v-for="todo in filteredTodos"
              :key="todo.id"
              :todoProp="todo"
              @del="deleteItem"
        ></item>
<!--        test-->

        <!--        将todos数据绑定到tabs组件的属性filterProp上-->
<!--        通过数组中todo为completed的状态的元素个数计算未完成任务个数等-->
        <tabs
                :filterProp="filter"
                :todosProp="todos"
                @toggle="changeState"
                @clearAllCompleted="clearAllCompleted"
        ></tabs>
    </section>
</template>

<script>
    // 把item和tabs导入到todo的section中，todo作为整体component导入app.vue
    // 在进行业务逻辑开发时，尽量把顶层数据都声明在集中的地方
    // 一般可以在app.vue里面或者集中的如这里todo.vue 里面，便于管理
    // 这里包含了item和tabs的所有数据
    import Item from './item.vue'
    import Tabs from './tabs.vue'

    // 全局变量储存最大id
    let id = 0

    export default {
        name: "todo",
        components: {
            Item,
            Tabs
        },
        data() {
            return {
                todos : [],
                filter : 'all'
            }
        },
        // filter发生变化时计算，根据filter过滤并返回新的todos数组
        // 用于渲染item元素
        computed : {
            filteredTodos() {
                // 如果为all，直接返回所有
                if (this.filter === 'all')
                    return this.todos;
                // 否则需要根据filter的值判断返回的值
                const completed = this.filter === 'completed' ? true : false
                // completed 为准则，判断每个是否需要返回
                return this.todos.filter(todo => todo.completed === completed)
            }
        },
        // 声明addTodo方法
        methods : {
            addTodo(e) {
                // 每次添加往数组中添加第一项,id为全局+1，content
                // 是input输入的数据
                this.todos.unshift({
                    id: id++,
                    content: e.target.value.trim(),
                    completed: false
                })
                e.target.value = ""
            },
            // 接受item组件发出事件的参数id，如果本组件的id和此id相同
            // 就删掉此组件
            deleteItem(id) {
                // findIndex 找到todos中和id相同的todo的索引号
                let deleteId = this.todos.findIndex(todo => todo.id === id)
                this.todos.splice(deleteId, 1)
            },
            changeState(state) {
                // 修改这里的filter
                this.filter = state
            },

            clearAllCompleted() {
                // 注意这里不能直接slice删除，因为删除的个数不固定
                // 每次删除一个，后面元素的index都会改变
                // 这里重新复制给todos
                this.todos = this.todos.filter(todo => !todo.completed)
            }
        }
    }
</script>

<style scoped lang="stylus">
    .real-app {
        width:600px
        margin:0 auto
        box-shadow 0 0 5px #666
    }
    .add-input {
        position: relative
        margin:0
        width:100%
        font-size: 24px
        font-family:inherit
        font-weight:inherit
        line-height: 1.4em
        border:0
        outline:none
        color: inherit
        padding:6px
        border:1px solid #999
        box-sizing border-box
        font-smoothing: antialiased
        padding:16px 16px 16px 60px
        box-shadow inset 0 -2px 1px rgba(0,0,0,0)
    }

</style>
