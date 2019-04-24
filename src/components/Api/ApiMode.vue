<template lang="html">
  <div class="api_mode__wrap" v-if="showModal">
    <button ref="api__button" class="btn_api_mode" :style='{left: `${leftSt}`}' @touchstart="startFn" @touchmove="dragFn" @click="toggleFn">接口换服</button>
    <transition name="fade">
      <div class="model_wrap_api"  v-if="showPane" @click="showPane=!showPane"></div>
    </transition>
    <transition name="slideTop">
      <div class="api_mode__contain" v-if="showPane">
        <div class="api_mode_content">
          <div class="content" v-if="active=='info'">
            <location></location>
          </div>

          <div class="content" v-if="active=='mode'">
            <mode></mode>
          </div>
          <div class="content" v-if="active=='switch'">
            <switch-pane></switch-pane>
          </div>
        </div>
        <div class="btm__pane">
          <ul class="btm_ul">
            <li :class="{active: active==item}" v-for="(item, index) in list" :key="index" @click="pick(item)">{{item}}</li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import mode from './mode.vue'
import location from './location.vue'
import switchPane from './switch.vue'
import env from '@/common/js/env.js'

export default {
  data: ()=> ({
    showPane: false,
    showModal: false,
    active: 'info',
    list: ['info', 'mode', 'switch', 'hide'],
    info: {
      origin: {
        fullpath: ""
      }
    },
    rect: {
      x: 0,
      y: 0,
      w: 100,
      h: 35,
    },
    w: 375,
    left: 0,
  }),
  computed: {
    leftSt() {
      return this.left
    }
  },
  components: {
    mode,
    location,
    switchPane
  },
  methods: {
    toggleFn() {
      this.showPane = !this.showPane
    },
    pick(val) {
      this.active = val
      if(val=='hide') {
        this.toggleFn()
      }
    },
    startFn(e) {
      let btn = this.$refs.api__button
      let rect = btn.getBoundingClientRect()
      let x = e.changedTouches[0].clientX
      this.rect.x = e.touches[0].clientX-rect.x
    },
    dragFn(e) {
      const self = this
      let btn = this.$refs.api__button
      let rect = btn.getBoundingClientRect()
      let x = e.changedTouches[0].clientX
      let y = e.changedTouches[0].clientY
      let d_x = x-this.rect.x
      if(d_x<=0) {
        self.left = 0
      }else if(d_x+this.rect.w>=this.w){
        self.left = this.w-rect.w
      }else {
        self.left = `${x-this.rect.x}px`
      }

      // btn.style.top = `${y}px`
    },
    clientRect() {
      let posi = {
        w: 375,
        h: 603
      }
      if (window.innerWidth == undefined) {
        posi.w = document.documentElement.clientWidth;
        posi.h = document.documentElement.clientHeight;
      } else {
        posi.w = window.innerWidth;
        posi.h = window.innerHeight;
      }
      return posi
    }
  },
  created() {
    if(env().env()){
      this.showModal = true
    }else {
      this.showModal = false
    }
  },
  mounted() {
    this.w = this.clientRect().w
  }
}
</script>

<style scoped lang="less">
@full_height: 280px;
@btm_height: 30px;
@content_height: 250px;
.btn_api_mode {
  position: absolute;
  width: 100px;
  height: 35px;
  font-size: 15px;
  color: #fff;
  border: none;
  outline: none;
  border-radius: 5px;
  background: #178ff1;
  z-index: 9999999999999;
  box-sizing: border-box;
  box-shadow: 0 0 5px #333;
  bottom: 20px;
  right: 20px;
  &:active {
    opacity: 0.8
  }
}
.model_wrap_api {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.3);
  z-index: 9999999999999;
}
.api_mode__contain {
  position: absolute;
  width: 100%;
  height: @full_height;
  box-sizing: border-box;
  background: #fff;
  top: 0;
  left: 0;
  box-shadow: 0 2px 5px #ddd;
  z-index: 9999999999999;
  .btm__pane {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: @btm_height;
    font-size: 14px;
    .btm_ul {
      display: flex;
      align-items: center;
      justify-content: space-around;
      list-style: none;
      width: 100%;
      height: 100%;
      moz-user-select: -moz-none;
      -moz-user-select: none;
      -o-user-select:none;
      -khtml-user-select:none;
      -webkit-user-select:none;
      -ms-user-select:none;
      user-select:none;
      border-top: 1px solid #eee;
      li {
        flex-grow: 1;
        display: flex;
        height: 100%;
        align-items: center;
        justify-content: center;
        background: #f5f5f5;
      }
      .active {
        background: rgb(245, 125, 38);
        color: #fff;
      }
    }
  }

  .api_mode_content {
    position: absolute;
    width: 100%;
    height: @content_height;
    overflow: auto;
    top: 0;
    h3 {
      font-size: 16px;
      font-weight: inherit;
      color: rgb(24, 143, 241);
      margin-top: 10px;
    }
    .content {
      .left {
        font-size: 12px;
        color: #333
      }
      .right {
        font-size: 12px;
        color: #999;
        display: inline-block;
        margin-left: 10px;
      }
    }
  }
}
.slideTop-enter-active, .slideTop-leave-active {
  transition: all 0.4s ease-out;
}
.slideTop-enter, .slideTop-leave-to {
  transform: translateY(-100%);
  // opacity: 0;
}
</style>
