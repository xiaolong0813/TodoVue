<template>
<!--    用冒号，即v-bind:的简写，可以在class上绑定更多内容和逻辑，比如绑定一个数组-->
<!--    动态class。绑定todo-item的class，以及基于todo.completed判断是否完成，
若完成就加completd样式。bind可以在后面添加对象，数组-->
    <div :class="['todo-item', todoProp.completed ? 'completed' : '']">
<!--        input是一个单选按钮，用于标定todo是否完成-->
<!--        用v-model双向绑定todoProp的completed属性-->
        <input type="checkbox"
        class="toggle"
        v-model="todoProp.completed"
        >
<!--        上面的input中v-model绑定了checkbox的状态，并通过双向绑定传给了todoProp的completed属性-->
<!--        该语法糖相当于以下元素：-->
<!--        <input type="checkbox" @change="val=>{todoProp.completed=val}" class="toggle">-->

<!--        引入内容-->
        <label>{{todoProp.content}}</label>
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
            todoProp: {
                type: Object,
                required:true
            }
        },
        methods : {
            deleteTodo() {
                // 因为需要在todo的item列表里面删除该组件
                // 需要在这里触发事件通知父组件todo.vue来删除
                // 可以在父组件传入的props里面声明delete方法
                // 这里再调用即可，但这里使用更简便的,触发事件
                this.$emit('del', this.todoProp.id)
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
        /*伪元素，在元素之后添加内容。即在后面加上图片*/
        &:after{
            /*position: absolute*/
            /*content: ''*/
            /*background-image url("../assets/images/round.jpg")*/
            /*background-size 3px 3px*/
            /*width: 3px*/
            /*height:3px*/
            /*display: inline-block*/
            content: url("../assets/images/round1.jpg");
        }
        // checked 状态的图片
        &:checked:after {
            content: url("../assets/images/done1.jpg")
        }
    }

    .destroy {
        position: absolute
        top:50%
        right: 10px
        bottom:0
        width:40px
        height: 40px
        margin:auto 0
        font-size:30px
        color: #cc9a9a
        margin-bottom 11px
        transition color 0.2s ease-out
        background-color: transparent
        appearance none
        border-width 0
        cursor: pointer
        outline:none
    }

</style>
