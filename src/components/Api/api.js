import ApiMode from './ApiMode.vue' // 引入vue模板
var api_mode = {} // 定义插件对象
api_mode.install = function(Vue, options) { // vue的install方法，用于定义vue插件
  // 如果toast还在，则不再执行
  if (document.getElementsByClassName('api_mode__wrap').length) {
    return
  }
  let ApiTpl = Vue.extend(ApiMode)
  let $vapi_mode = new ApiTpl() // 实例化vue实例
  // window.vTip = $vm
  window.origin_host = $vapi_mode
  let tpl = $vapi_mode.$mount().$el
  document.body.appendChild(tpl)
  Vue.prototype.$api_mode = { // 在Vue的原型上添加实例方法，以全局调用
    confirm: (options)=> {
      Object.assign($vapi_mode, options)
    },
    hide: function() {
      $vapi_mode.showPane = false
    }
  }

}
export default api_mode;
