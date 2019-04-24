/**
 * date: 18/09/21
 * desc: 条目 样式
 * use:
 */
import EntryItem from './src/EntryItem.vue'

EntryItem.install = function (Vue) {
  Vue.component(EntryItem.name, EntryItem)
}

export default EntryItem
