<template>
  <div>
    <div class="api_mode_content">
      <h3>原始数据</h3>
      <p>
        <span class="left">fullpath:</span>
        <span class="right">{{info.origin.fullpath}}</span>
      </p>
      <!-- <h3>mode数据</h3> -->
      <input class='location_input' type="text" placeholder='请输入跳转链接' v-model='href'>
      <button class='location_btn' name="button" @click='goHref'>前往</button>
      <button class='location_btn' name="button" @click='goMore'>更多</button>
    </div>
  </div>
</template>

<script>
import common from './common.js'

export default {
  data: ()=>({
    href: '',
    info: {
      origin: {
        fullpath: ""
      }
    },
  }),
  methods: {
    goHref() {
      if(this.href!='') {
        window.location.href = this.href
      }
    },
    goMore() {
      window.location.href = '//kaifa.jianbing.com/business/home/test/get/go.php'
    },
    infoFn() {
      let url = window.location.href
      console.log(url);
      let query = common.getUrlData()
      if(!!query.api_symbol) {
        let path = localStorage.getItem('origin_path')
        this.info.origin.fullpath = path
      }else {
        let fullpath = window.location.href
        this.info.origin.fullpath = fullpath
      }
    },
  },
  mounted() {
    this.infoFn()
  }
}
</script>

<style scoped lang="less">
@full_height: 280px;
@btm_height: 30px;
@content_height: 250px;
.location_input {
  width: 80%;
  height: 35px;
  margin: 20px;
}
.location_btn {
  width: 100px;
  height: 35px;
  color: #fff;
  outline: none;
  background: rgb(25, 209, 181);
  border: none;
  border-radius: 5px;
  margin: 0 20px;
  &:active {
    opacity: 0.8
  }
}
.api_mode_content {
  position: absolute;
  width: 100%;
  height: @content_height;
  overflow: auto;
  top: 0;
  padding: 20px;
  box-sizing: border-box;
  h3 {
    font-size: 16px;
    font-weight: inherit;
    color: rgb(24, 143, 241);
    margin-top: 10px;
  }
  .content {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .left {
      font-size: 13px;
      color: #333
    }
    .right {
      font-size: 13px;
      color: #999;
      display: inline-block;
      word-break: break-all;
    }
  }
}
</style>
