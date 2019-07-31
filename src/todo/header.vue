<template>
    <header class="main-header">
        <h1>Todo</h1>
    </header>
</template>

<script>
    export default {
        name: "header.vue"
    }
</script>

<style scoped lang="stylus">
    .main-header {
        text-align: center
    }
    h1 {
        font-size: 100px
        color: rgba(175,47,47,0.4)
        font-weight:100
        margin: 20px
        /*font-weight:bold*/
    }
</style>
