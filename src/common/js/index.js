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

export function getUrlData(search) {
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
}
