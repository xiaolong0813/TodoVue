<template>
    <div class="helper">
<!--        绑定computed中的函数计算剩下未完成任务的个数-->
        <span class="left">{{unFinishedTodoLength}} items left</span>
<!--        加入选择项-->
        <span class="tabs">
<!--            v-for循环出几个tab元素，但要注意：循环出来的,包括-->
<!--            jsx中forEach这种html节点，需要绑定唯一的key标明。-->
<!--            这样在下次数据变动时，可以直接复用该元素，不会重新生成-->
<!--            元素。因为循环创建耗时耗资源，这样会提高很多效率-->
            <span v-for="state in states"
                  :key="state"
                  :class="[state, state === filterProp ? 'actived' : '']"
                  @click="toggleFilter(state)">
<!--         上层组件todo传入标识filter，根据filter判断激活哪个tab，以修改为actived样式-->
                {{state}}
            </span>
        </span>

<!--        把所有completed的事件清除掉-->
        <span class="clear" @click="clearAllCompleted">Clear Completed</span>

    </div>
</template>

<script>
    export default {
        name: "tabs",
        // 接受父级组件参数filter，来对每个item进行判断
        props: {
            filterProp : {
                type : String,
                required : true
            },
            todosProp : {
                type: Array,
                required: true
            }
        },
        // 每次有依赖数据变化时，也就是todosProp的值变化时，
        // 进行计算
        computed : {
            // 筛选未完成的数据统计个数
            unFinishedTodoLength() {
                return this.todosProp.filter(todo => !todo.completed).length
            }
        },
        methods : {
            // 向父组件发送事件，告知状态filter改变为state
            toggleFilter(state) {
                this.$emit('toggle', state)
            },
            clearAllCompleted() {
                this.$emit('clearAllCompleted')
            }
        },
        data() {
            return {
                // item不同的状态
                states : ['all', 'active', 'completed'],
            }
        }
    }
</script>

<style scoped lang="stylus">
    .helper {
        font-weight:100
        display: flex
        justify-content:space-between
        padding:5px 0
        line-height: 30px
        background-color: #fff
        font-size: 14px
        font-smoothing: antialiased

    }

    .left, .clear, .tabs {
        padding:0 10px
        box-sizing border-box
    }

    .left, .clear {
        width: 150px
    }

    .left {
        text-align left
    }
    
    .clear {
        text-align right
        cursor: pointer
    }
    
    .tabs {
        width:200px
        display: flex
        justify-content:space-around
        /*内部所有元素*/
        * {
            display inline-block
            padding:0 10px
            cursor: pointer
            border:1px solid rgba(175,47,47,0)
            /*&*/
        }
    }
    .actived {
        border-color rgba(175,47,47,0.4)
        border-radius 5px
    }

</style>
