// 获取当前域名等信息
export function browserInfo () {
  let lc = window.location
  return {
    userAgent: window.navigator.userAgent,
    host: lc.host,
    origin: lc.origin,
    href: lc.href
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
// 返回host
export function appHost () {
  let hostFn = browserInfo()
  var host = hostFn.host
  var f = ''
  if (/(127\.0\.0\.1|localhost|192\.168\.101\.55|kaifa)/g.test(host)) {
    f = 'https://kaifa.jianbing.com'
    var props = getUrlData()
    if (props.api_mode) {
      if (props.api_mode === 'cdn') {
        f = `https://b.jianbing.com`
      } else if (props.api_mode === 'test') {
        f = `https://test.jianbing.com`
      }
    }
  } else {
    f = window.location.origin
  }
  return f
}

// 动态添加代码
export function addCode () {
  class InsertCode {
    hasCode (id) {
      let a = false
      let idcase = document.getElementById(id)
      if (idcase) {
        a = true
      }
      return a
    }
    insert (id, code) {
      let _this = this
      if (_this.hasCode(id)) {
        // 存在代码
        return false
      } else {
        try {
          var script = document.createElement('script')
          script.type = 'text/javascript'
          script.async = true
          script.id = id
          script.innerHTML = code
          var s = document.getElementsByTagName('script')[0]
          s.parentNode.insertBefore(script, s)
        } catch (e) {
          console.log(e)
        }
      }
    }
  }
  return new InsertCode()
}

// 返回userAgent
export function isApp () {
  let u = browserInfo().userAgent
  let app = {
    mobile: !!u.match(/AppleWebKit.*Mobile.*/),
    isAndroid: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 || u.indexOf('android') > -1,
    isiOS: /[\w\W]*ios\/[\w\W]+client\/[\w\W]+device\/[\w\W]+theme\/[\w\W]+$/.test(u),
    webApp: u.indexOf('Safari') === -1,
    weixin: u.indexOf('MicroMessenger') > -1,
    isGjj: /^android\/[\w\W]+client\/[\w\W]+theme\/[\w\W]+$/.test(u) || /^[\w\W]*ios\/[\w\W]+client\/[\w\W]+device\/[\w\W]+theme\/[\w\W]+$/.test(u),
    isAndroidGjj: /^android\/[\w\W]+client\/[\w\W]+theme\/[\w\W]+$/.test(u),
    isiOSGjj: /^[\w\W]*ios\/[\w\W]+client\/[\w\W]+device\/[\w\W]+theme\/[\w\W]+$/.test(u),
    isGjjFdjsq: /^android\/[\w\W]+client\/[\w\W]+category\/51fdjsq$/.test(u),
    isWeixin: /MicroMessenger/i.test(u)
  }
  return app
}

// 判断环境
export function env () {
  let e = 'kaifa'
  let app = appHost()
  if (app.match(/kaifa/g)) {
    e = 'kaifa'
  } else if (app.match(/test/g)) {
    e = 'test'
  } else if (app.match(/b\.jianbing/g)) {
    e = 'cdn'
  }
  return e
}

// 获取尺寸
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

// 重力效果js
export function gravity (el, hg = 300, vv = 4) {
  let p = this.clientRect()
  let h = p.h - hg
  let c = this.$refs[el]
  let d = 1
  let vt = 1
  function frame () {
    window.requestAnimationFrame(frame)
    let ho = c.getBoundingClientRect().y
    if (d > 0) {
      if (ho > h) {
        d = -1
        vv--
      } else {
        vt += 0.1
        ho += vt * d
        c.style.top = `${ho}px`
      }
    } else {
      if (ho > (h - h / 10 * vv)) {
        vt -= 0.1
        ho += vt * d
        c.style.top = `${ho}px`
      } else {
        d = 1
        vt = 1
      }
    }
    if (vv === 0) return false
  }
  frame()
}
