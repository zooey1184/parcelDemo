/* global  Global */
/**
 * 判断环境的函数类
 */
export default function () {
  class Env {
    constructor () {
      this.kaifaEnv = ['127.0.0.1', 'localhost', 'kaifa.jianbing.com', 'dev.51veryrich.com', 'dev.51jiedianhua.com', '192.168.101.55', 'test.jianbing.com']
    }
    originHost (str = 'kaifa.jianbing.com') {
      let kaifa = this.kaifaEnv
      let o = window.location.host
      let protocol = window.location.protocol // => http:  || https:
      let s = `${protocol}//${str}`
      let t = kaifa.some((item, index, arr) => {
        let r = new RegExp(item)
        return o.match(r)
      })
      if (t) {
        return s
      } else {
        return `${protocol}//${o}`
      }
    }
    env () {
      let kaifa = this.kaifaEnv
      let o = window.location.host
      let t = kaifa.some((item, index, arr) => {
        let r = new RegExp(item)
        return o.match(r)
      })
      return t
    }
    mode () {
      let origin_mode = 'kaifa_jianbing_com'
      let pro = window.location.host
      let slag = 'app'
      let fullpath = ''
      let protocol = window.location.protocol
      if (Global.getUrlData().origin_mode) {
        origin_mode = Global.getUrlData().origin_mode
        pro = origin_mode.replace(/_/g, '.')
        pro = `${protocol}//${pro}`
      } else {
        pro = `${protocol}//${pro}`
      }
      if (Global.getUrlData().slag) {
        slag = Global.getUrlData().slag
      }
      if (Global.getUrlData().fullpath) {
        fullpath = Global.getUrlData().fullpath
      }
      return {
        o: pro,
        s: slag,
        p: fullpath
      }
    }
  }
  return new Env()
}
