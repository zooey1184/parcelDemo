<!-- 波纹效果组件  使用方式同普通标签  属性有背景色  -->
<template>
  <div class="wave_wrap_pane" ref='wave' @touchstart="getWave" :style="{ borderRadius: radius, webkitBorderRadius: radius}">
    <slot></slot>
    <div v-show="showModal" ref='contain' :class="{animation: addani}" :style="{top: `${y}px`, left: `${x}px`, background: bg}" class="wave_contain"></div>
  </div>
</template>

<script>
export default {
  name: 'wave-wrap',
  props: {
    bg: {
      type: String,
      default: "rgba(0,0,0,0.1)"
    },
    radius: {
      type: String,
      default: '0px'
    }
  },
  data: ()=> ({
    showModal: false,
    addani: false,
    x: 0,
    y: 0,
  }),
  methods: {
    getWave(e) {
      let w = this.$refs.wave
      let rect = w.getBoundingClientRect()
      let width = rect.width/4
      let height = rect.height/4
      let xx = rect.left
      let yy = rect.top
      let ww = (width>height)? width : height
      this.showModal = true
      let c = this.$refs.contain
      c.style.height = `${ww}px`
      c.style.width = `${ww}px`
      this.x = e.changedTouches[0].clientX-20-xx
      this.y = e.changedTouches[0].clientY-20-yy
      this.addani = true
      setTimeout(()=> {
        this.showModal = false
      }, 400)
    }
  }
}
</script>

<style lang="less">
.wave_wrap_pane {
  position: relative;
  overflow: hidden;
  height: 100%;
  width: 100%;
}
.wave_contain {
  position: absolute;
  background: rgba(0,0,0,0.1);
  border-radius: 50%;
  width: 0;
  height: 0;
  transform-origin: 50% 50%;
}
.animation {
  animation: scale 500ms linear
}
@keyframes scale {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(10);
    opacity: 0
  }
}
</style>
