import env from '@/common/js/env.js'

export default {
  getUrlData(search) {
    let obj = {}
    let dataArr = decodeURIComponent(window.location.search.slice(1)).split("&")
    dataArr.forEach((e,i) => {
      try {
        let arr = e.split('=')
        obj[arr[0]] = arr[1]
      } catch (error) {
        console.log(e)
      }
    })
    return search ? obj[search] : obj
  },
  state(switchTurn) {
    // switchTurn => 开关
    console.log(`%c当前设置了SWITCH:${switchTurn}`, 'color: #1395f4')
    let s = sessionStorage.getItem('SWITCH') || '[]'
    let arr = JSON.parse(s)
    let t = false
    if(env().env()) {
      t = arr.some((item, index, arr)=> {
        return item===switchTurn
      })
    }else {
      t = false
    }
    return t
  }
}
