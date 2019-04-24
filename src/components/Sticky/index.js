/**
 * @author: zooey
 * date: 18/11/05
 * desc: 组件-吸顶
 * use: 同正常标签
 */
import Sticky from './src/sticky.vue'

Sticky.install = function (Vue) {
  Vue.component(Sticky.name, Sticky)
}

export default Sticky
