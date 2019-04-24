<template lang="html">
  <div class="content">
    <aside class="">
      <ul>
        <li :class="{active: active==item.value}" v-for="(item, index) in list" :key="index" @click="pick(item.value)">{{item.text}}</li>
      </ul>
    </aside>
    <section>
      <article class="" v-if="active=='dev'">
        <p>模式: kaifa.jianbing.com</p>
        <button class="btn_mode" @click="setButton('dev')">设置</button>
      </article>
      <article class="" v-if="active=='test'">
        <p>模式: test.jianbing.com</p>
        <button class="btn_mode" @click="setButton('test')">设置</button>
      </article>
      <article class="" v-if="active=='pro'">
        <p>模式: b.jianbing.com</p>
        <button class="btn_mode" @click="setButton('pro')">设置</button>
      </article>
      <article class="" v-if="active=='custom'">
        <input type="text" class="input_custom" placeholder="请输入域名（不包含http）" v-model="custom_host">
        <button class="btn_mode" @click="setButton('custom')">设置</button>
      </article>
      <article class="" v-if="active=='remove'">
        <p>移除换服数据</p>
        <button class="btn_mode" @click='setButton("remove")'>清除</button>
      </article>
      <article class="" v-if="active=='reload'">
        <p>刷新</p>
        <button class="btn_mode" @click='reloadFn'>刷新</button>
      </article>
    </section>
  </div>
</template>

<script>
import common from './common'

export default {
  data: ()=> ({
    active: 'dev',
    list: [
      {text: "开发服", value: "dev"},
      {text: "测试服", value: "test"},
      {text: "正式服", value: "pro"},
      {text: "自定义", value: "custom"},
      {text: "清除", value: "remove"},
      {text: "刷新", value: "reload"},
    ],
    custom_host: ""
  }),
  methods: {
    pushQuery(mode) {
      let query = common.getUrlData()
      if(!!query.api_symbol) {
        let api = query.api_symbol
        if(mode==='null' || mode==='undefined' || mode==='remove') {
          let nourl = window.location.href.replace(/(\&|\?)api_symbol=(dev|test|pro|custom|null|undefined|remove)/g, '')
          history.pushState({}, document.title, nourl)
          return
        }
        let hasurl = window.location.href.replace(/api_symbol=(dev|test|pro|custom|null|undefined)/g, `api_symbol=${mode}`)
        history.pushState({}, document.title, hasurl)
        return
      }else {
        let w =  window.location.href
        if(mode!=='null' && mode!=='undefined' && mode!=='remove') {
          let url = w.match(/\?/g) ? `${w}&api_symbol=${mode}`: `${w}?api_symbol=${mode}`
          history.pushState({}, document.title, url)
        }
      }
    },
    pick(val) {
      this.active = val
    },
    setButton(val) {
      this.pushQuery(val)
      const origin = ['kaifa.jianbing.com', 'test.jianbing.com', 'b.jianbing.com']
      localStorage.setItem('api_symbol', val)
      if(val==='dev') {
        localStorage.setItem('origin_mode', origin[0])
        sessionStorage.setItem('origin_host', origin[0])
      }else if(val==='test') {
        localStorage.setItem('origin_mode', origin[1])
        sessionStorage.setItem('origin_host', origin[1])
      }else if(val==='pro') {
        localStorage.setItem('origin_mode', origin[2])
        sessionStorage.setItem('origin_host', origin[2])
      }else if(val==='custom') {
        localStorage.setItem('origin_mode', this.custom_host)
        sessionStorage.setItem('origin_host', this.custom_host)
      }else if(val==='remove') {
        this.removeBtn()
      }
      setTimeout(()=> {
        this.reloadFn()
      }, 500)
      // if(val=='dev') {
      //   console.log();
      // }
    },
    removeBtn() {
      // 移除换服数据
      localStorage.removeItem('api_symbol')
      localStorage.removeItem('origin_mode')
      sessionStorage.removeItem('origin_host')
    },
    reloadFn() {
      window.location.reload()
    }
  }
}
</script>

<style scoped lang="less">
.content {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
}
aside {
  position: absolute;
  left: 0;
  width: 30%;
  height: 100%;
  top: 0;
  overflow-y: auto;
  background: rgb(214, 214, 214);
  li {
    height: 35px;
    color: #fff;
    width: 100%;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #c7c7c7;
    position: relative;
    &:after {
      position: absolute;
      content: "";
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background: #fff;
    }
  }
  .active {
    background: rgb(79, 219, 164);
  }
}
section {
  position: absolute;
  left: 30%;
  width: 70%;
  padding: 10px;
}
.btn_mode {
  width: 120px;
  height: 35px;
  font-size: 14px;
  border: none;
  outline: none;
  border-radius: 5px;
  margin-top: 10px;
  background: rgb(79, 219, 164);
  color: #fff;
  &:active {
    opacity: .8;
  }
}
.input_custom {
  width: 80%;
  height: 35px;
  padding: 0 5px;
}
</style>
