#### parcel 打包demo
****

parcel 是新式的打包工具，如同webpack一样，如果你烦恼繁杂的配置，那么这个你可以入手折腾一番，相信你会觉得这个确实也是一种选择，当然他的优点不仅于此，利用缓存可以将打包时间压缩到2-3s,甚至1.xs,更多优点这边就详细说，你可以上网看下相关文章

[【传送门】](https://zh.parceljs.org/getting_started.html)

#### 快速开始
```js
1
npm install -g parcel-bundler
// or
yarn global add parcel-bundler
```
```js
2
npm init -y
// or
yarn init -y
```
安装你需要安装的配置


附上我的配置
```js
{
  "name": "demo",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "start": "node config.js",
    "b": "parcel src/pages/shitou/index.js"
  },
  "dependencies": {
    "@babel/preset-env": "^7.4.3",
    "better-scroll": "^1.15.2",
    "jquery": "^3.4.0",
    "vue": "^2.6.10",
    "vue-hot-reload-api": "^2.3.3",
    "vue-router": "^3.0.6",
    "vuex": "^3.1.0"
  },
  "devDependencies": {
    "@vue/component-compiler-utils": "^3.0.0",
    "less": "^3.9.0",
    "parcel-bundler": "^1.12.3",
    "stylus": "^0.54.5",
    "vue-template-compiler": "^2.6.10"
  }
}
```

**注意** 
如果你使用cli的方式运行打包
那么你的方式还会更加简单
只需要把scripts的start的改成如下并且你的项目将不需要config.js
ps: config.js是parcel提供的api的方式，使你可以更加定制化你的打包过程
```js
"scripts": {
  "start": "parcel src/pages/demo/index.html",  // 这个是你的入口文件html
  "b": "parcel src/pages/demo/index.js"
},
```
