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

        <item :todo="todo"></item>
    </section>
</template>

<script>
    // 把item导入到todo的section中，todo作为整体component导入app.vue
    import Item from './item.vue'

    export default {
        name: "todo",
        components: {
            Item
        },
        data() {
            return {
                todo : {
                    id: 0,
                    content : 'this is todo',
                    completed : false
                }
            }
        },
        // 声明addTodo方法
        methods : {
            addTodo() {

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
