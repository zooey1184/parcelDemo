/**
 * @author: zooey
 * changer: zooey
 * Date: 18/08/24
 * desc: 插件-选择器
 * use: this.$alert.show({obj}) || this.$alert.show('string') && this.$alert.hide()
 */
import ActionSheet from './src/actionSheet.vue'
var actionSheet = {}
actionSheet.install = function (Vue, options) {
  if (document.getElementsByClassName('actionSheet--full').length) {
    return
  }
  let AlertTpl = Vue.extend(ActionSheet)
  let $sheet = new AlertTpl()
  window.vSheet = $sheet
  let tpl = $sheet.$mount().$el
  document.body.appendChild(tpl)
  Vue.prototype.$sheet = {
    show: (options) => {
      try {
        if (document.getElementsByClassName('actionSheet--full').length) {
          return
        }
        $sheet.list = options.list
        $sheet.selectFn = options.selectFn
        $sheet.animate = options.animate || 'slideC'
        $sheet.showToast = true
        setTimeout(() => {
          $sheet.showSheet = true
        }, 50)
      } catch (e) {
        console.log(e)
      }
    },
    hide: () => {
      setTimeout(() => {
        $sheet.showToast = false
      }, 50)
      $sheet.showSheet = false
    }
  }
}
export default actionSheet
