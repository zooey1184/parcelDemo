const fs = require('fs')
const path = require('path')

const p = path.resolve(__dirname, '../dist/')

function getFiles(filePath, callback) {
  fs.readdir(filePath, (e, files)=> {
    if(e) return false

    let count = 0
    for(let i in files) {
      let fileDir = path.join(filePath, files[i])
      count++;
      fs.stat(fileDir, (err, stats)=> {
        if(err) return false

        let isFile = stats.isFile()
        let isDir = stats.isDirectory()

        if(isFile) {
          let fp = path.join(filePath, files[i])
          if(callback && typeof callback === 'function') {
            callback(fp)
          }
        }
        if(isDir) {
          getFiles(fileDir, callback)
        }
      })
    }
    console.log(`我是${filePath}, 文件数：${count}`)
  })
}

getFiles(p, (e)=> {
  console.log(e)
})