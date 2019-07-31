<template>
<!--    用冒号，即v-bind:的简写，可以在class上绑定更多内容和逻辑，比如绑定一个数组-->
<!--    动态class。绑定todo-item的class，以及基于todo.completed判断是否完成，
若完成就加completd样式。bind可以在后面添加对象，数组-->
    <div :class="['todo-item', todo.completed ? 'completed' : '']">
<!--        input是一个单选按钮，用于标定todo是否完成-->
        <input type="checkbox"
        class="toggle"
        v-model="todo.completed"
        >
<!--        引入内容-->
        <label>{{todo.content}}</label>
        <button class="destroy" @click="deleteTodo"></button>
    </div>
</template>

<script>
    export default {
        name: "item",
        // props可以在组建上注册一些自定义特性
        // 传入props的一个特性就是组件实例中的一个属性
        // 这里todo就变成了input的一个属性
        // 其类型是Object，必须传入
        props : {
            todo: {
                type: Object,
                required:true
            }
        },
        methods : {
            deleteTodo() {

            }
        }
    }
</script>

<style scoped lang="stylus">

    .todo-item{
        position: relative
        background-color: #fff
        font-size 24px
        border-bottom:1px solid rgba(0,0,0,0.06)
        /*&标识上层选择器*/
        &:hover{
            .destroy:after{
                content: 'x'
            }
        }
        label {
            //换行的时候保留换行符
            white-space pre-line
            word-break break-all
            padding:15px 60px 15px 15px
            margin-left:45px
            display: block
            line-height:1.2
            //下面表示hover的时候，颜色在0.4s内变为red
            transition color 0.4s
            &:hover{
                color: red
            }
        }
        /*定义完成的样式*/
        &.completed {
            label {
                color: #d9d9d9
                //文本修饰。ling-through表示划掉此项
                text-decoration: line-through
            }
        }
    }

        //单选框样式
    .toggle {
        text-align: center
        width:40px
        height:40px
        /*absolute和top bottome等一起用于定位*/
        position: absolute
        top:0
        bottom:0
        margin:auto 0
        border:none
        //使元素看上去像标准的用户界面元素
        appearance none
        outline none
        &:after{

        }

    }



    .destroy {
        position: relative
    }

</style>
