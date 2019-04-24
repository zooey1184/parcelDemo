/**
 * @author: zooey
 * Date: 18/07/09
 * desc: 插件-mark
 * use: this.$mark.show({obj}) || this.$mark.show('string') && this.$mark.hide()
 */
import Mark from './src/mark.vue'
var mark = {}
mark.install = function (Vue, options) {
  if (document.getElementsByClassName('mark--full').length) {
    return
  }
  let MarkTpl = Vue.extend(Mark)
  let $vmark = new MarkTpl()
  window.vmark = $vmark
  let tpl = $vmark.$mount().$el
  document.body.appendChild(tpl)
  Vue.mark = Vue.prototype.$mark = {
    show: (options) => {
      try {
        if (document.getElementsByClassName('mark--full').length) {
          return
        }
        Object.assign($vmark, options)
        // if (!options.btn) {
        //   $vmark.btn = ['取消', '确定']
        // }
        if (!options.animate) {
          $vmark.animate = 'fade'
        }
        $vmark.showToast = true
      } catch (e) {
        console.log(e)
      }
    },
    hide: () => {
      $vmark.showToast = false
    }
  }
}
export default mark
