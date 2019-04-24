/**
 * @author: zengxuyan
 * changer: zengxuyan
 * date: 18/08/02
 * desc: 组件-上拉加载-下拉刷新
 * use: props: 
 */
import myScroll from './src/myScroll.vue'

myScroll.install = function (Vue) {
  Vue.component(myScroll.name, myScroll)
}

export default myScroll
