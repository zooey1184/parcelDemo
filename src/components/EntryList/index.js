/**
 * date: 18/09/21
 * desc: 条目 样式容器
 * use:
 */
import EntryList from './src/EntryList.vue'

EntryList.install = function (Vue) {
  Vue.component(EntryList.name, EntryList)
}

export default EntryList
