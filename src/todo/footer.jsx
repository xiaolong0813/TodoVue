// jsx 就是把html内容写在js代码里面，而不是像.vue。其实.vue里面的实现
// 也是标签的形式，类似html
// 所以jsx 使用的也是js的语法
// 在render函数里面写html内容

// jsx和vue文件都会转换为render方法（createElement).其中的变量，如data，可以传入
// 但jsx内部无法直接写style。需要拆分出去写，在引入
import '../assets/styles/footer.styl'

// 用jsx的好处是可以任意添加自定义功能。使用js可以实现更多逻辑
export default {
    data() {
        return {
            author : 'Xiaolong'
        }
    },
    render() {
        let version = "1.0"
        return (
            <div id="footer">
                <span>Writen by {this.author}-{version}</span>
            </div>
        )
    }
}
