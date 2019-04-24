/* global _jaq */
import { appHost, isApp } from './business.js'
const APP_HOST = appHost()
const USER_AGENT = isApp()

export function urlOrigin () {
  const origin = window.location.origin
  return /(127\.0\.0\.1|localhost|192\.168\.101\.55)/g.test(origin) ? 'http://kaifa.jianbing.com' : origin
}

export function appDevEvn () {
  if (/(kaifa\.jianbing\.com|test\.jianbing\.com|localhost|127\.0\.0\.1|dev\.51veryrich\.com)/.test(urlOrigin())) {
    return true
  } else {
    return false
  }
}

// 获取地址栏地址
export function getUrlData (search) {
  let obj = {}
  let dataArr = decodeURIComponent(window.location.search.slice(1)).split('&')
  dataArr.forEach((e, i) => {
    try {
      let arr = e.split('=')
      obj[arr[0]] = arr[1]
    } catch (error) {
      console.log(e)
    }
  })
  return search ? obj[search] : obj
}
// 判断是否登录（浅）
export function checkLogin (token = 'auth_token') {
  let cookie = document.cookie
  let loginStatus = false
  let c = new RegExp(token)
  if (cookie.match(c)) {
    loginStatus = true
  } else {
    loginStatus = false
  }
  return loginStatus
}
// 直接login
export function login () {
  if (USER_AGENT.isGjj && window.Bridge) {
    window.Bridge.action('login')
  } else {
    let oFrom = getUrlData().from || 'jianbing'
    let href = window.location.href
    let host = location.origin
    let reg = new RegExp(host)
    let h = href.replace(reg, APP_HOST)
    let hurl = h.match(/from/g) ? h : (h.match(/\?/g) ? `${h}&from=${oFrom}` : `${h}?from=${oFrom}`)
    window.location.href = `${APP_HOST}/hs/appgjj/login?appid=wx90f7de7c9b73bf69&return_url=${encodeURIComponent(hurl)}`
  }
}
// 埋点
export function burryPoint (type = 'event', id = 1, desc = {}) {
  // id: 后台配置
  // desc: 埋点描述
  // type: 类型，进入页面或者事件埋点 进入[页面埋点]不需要id和描述
  let script = document.getElementsByTagName('script')
  let reg = 'r.51gjj.com/assets/ja.min_1.1.0.js'
  let r = new RegExp(reg)
  class Point {
    hasJs () {
      let a = false
      for (let value of script) {
        if (value.src.match(r)) {
          a = true
        }
      }
      return a
    }
    insertJs (callback) {
      let t = this.hasJs()
      if (t) {
        callback()
      } else {
        var ja = document.createElement('script'); ja.type = 'text/javascript'; ja.async = true
        ja.src = (document.location.protocol === 'https:' ? 'https://' : 'http://') + 'r.51gjj.com/assets/ja.min_1.1.0.js'
        var s = document.getElementsByTagName('script')[0]
        s.parentNode.insertBefore(ja, s)
        document.write(`<script>var _jaq = _jaq || []</script>`)
        callback()
      }
    }
    deviceFn () {
      let device = 'android'
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        device = 'ios'
      } else if (/(Android)/i.test(navigator.userAgent)) {
        device = 'android'
      } else {
        device = 'pc'
      };
      return device
    }
  }
  let p = new Point()
  p.insertJs(insertPoint)
  function insertPoint () {
    let d = p.deviceFn()
    let obj = {
      category: d
    }
    Object.assign(obj, desc)
    if (type === 'view' || type === 0 || type === 'v') {
      console.log('进入页面埋点成功')
      _jaq.push(['_trackPageview'])
    } else if (type === 'event' || type === 'e' || type === 1) {
      console.log('事件埋点成功')
      _jaq.push(['_trackEvent', id, obj])
    }
  }
}

// 时间处理函数
export function timeFormate () {
  class TimeFn {
    // 倒计时
    countDown (time = 60, start = function () {}, done = function () {}, over = function () {}) {
      try {
        if (Number.isNaN(Number.parseInt(time))) {
          console.log('非数字')
          return
        } else {
          let n = Number.parseInt(time)
          let originT = n
          // let s = originT - 1
          let timer = setInterval(() => {
            console.log(n)
            done()
            if (originT === n) {
              start()
            }
            if (n < 1) {
              n = originT
              over()
              clearInterval(timer)
            } else {
              n--
            }
          }, 1000)
        }
      } catch (e) {
        console.log(e)
      }
    }
    // 格式化
    formate (t = new Date(), split = '-', date = 0) {
      let time = new Date(t)
      let y = time.getFullYear()
      let m = (time.getMonth() + 1) < 10 ? `0${time.getMonth() + 1}` : time.getMonth() + 1
      let d = time.getDate() < 10 ? `0${time.getDate()}` : time.getDate()
      let h = time.getHours() < 10 ? `0${time.getHours()}` : time.getHours()
      let min = time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes()
      let sec = time.getSeconds() < 10 ? `0${time.getSeconds()}` : time.getSeconds()
      let formate = `${y}${split}${m}${split}${d}`
      if (date === 0) {
        return formate
      } else {
        formate = `${y}${split}${m}${split}${d} ${h}:${min}:${sec}`
        return formate
      }
    }
  }
  let t = new TimeFn()
  return t
}

// 获取body的dom位置宽高元素
export function clientRect () {
  let posi = {
    w: 375,
    h: 603
  }
  if (window.innerWidth === undefined) {
    posi.w = document.documentElement.clientWidth
    posi.h = document.documentElement.clientHeight
  } else {
    posi.w = window.innerWidth
    posi.h = window.innerHeight
  }
  return posi
}

// 处理*
export function replaceSym (str, first = 6, last = 4, r = '*', c = 10) {
  let f = str.substr(0, 5)
  let len = str.length - 1
  let l = str.substr(-4, len)
  let middle = r.repeat(c)
  let string = `${f}${middle}${l}`
  return string
}

// 图片预处理
export function preload () {
  class PreloadImg {
    getImg (success = function () {}) {
      var over = false
      var self = this
      var arr = document.getElementsByTagName('img')
      var len = arr.length
      var setArr = []
      setArr.length = len
      var empty = []
      if (len > 0) {
        console.log('%c 有' + len + '图片', 'color: rgb(237, 31, 187)')
        try {
          var t = (new Date()).getTime()
          for (var i = 0; i < len; i++) {
            // console.log('%c 开始加载第'+i+'张图片', 'color: #1395f4')
            self.imgLoad(arr[i], function () {
              empty.push(i)
              var earr = empty.length
              if (earr === len) {
                var t1 = (new Date()).getTime()
                var tt = t1 - t
                console.log('%c ' + len + '张全部加载完, 总耗时' + tt + '毫秒', 'color: #42cb26')
                over = true
                success()
                return over
              }
            })
          }
        } catch (e) {
          console.log('%c 该方法报错了', 'color: #d43f33')
          console.log(e)
          over = true
          return over
        }
      } else {
        console.log('%c 没有图片', 'color: #f509cf')
        over = true
        return over
      }
    }
    imgLoad (img, callback) {
      var timer = setInterval(function () {
        if (img.complete) {
          callback(img)
          clearInterval(timer)
        }
      }, 20)
    }
  }
  return new PreloadImg()
}
