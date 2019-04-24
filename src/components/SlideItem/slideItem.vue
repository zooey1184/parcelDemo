<!-- 手风琴组件 -->
<template lang="html">
  <div class="c-slideItem">
    <div class="slideItem--head" @click='showContentFn'>
      {{title}}
      <img class="slideItem__icon" :class="{arrow: showPane}"  :src="arrowSrc" alt="">
    </div>
    <div class="slideItem--content" :style="{height: showPane? `${containH}px`:'0'}">
      <div class="contain_loan" ref="contain">
        <slot name='contain'></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: ()=> ({
    showPane: false,
    containH: 40
  }),
  props: {
    title: String,
    arrowSrc:{
      type: String,
      default: '//r.51gjj.com/resource/common/icon/icon_back.png'
    } 
  },
  methods: {
    showContentFn() {
      this.showPane = !this.showPane
      this.getRect()
    },
    getRect() {
      let f = this.$refs.contain
      let r = f.getBoundingClientRect()
      this.containH = r.height+15
    }
  }
}
</script>

<style scoped lang="less">
.c-slideItem {
  background: #fff;
  position: relative;
  .underline;
}
.slideItem--head {
  height: 43px;
  font-size: 14px;
  padding: 14px 16px;
  box-sizing: border-box;
  position: relative;
  .slideItem__icon {
    position: absolute;
    right: 16px;
    top: 15px;
    width: 7px;
    transition: all 0.3s linear;
  }
}
.slideItem--content {
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease-out;
  box-sizing: border-box;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  .contain_loan {
    box-sizing: border-box;
    padding: 0 15px;
    color: #A8A8A8;
    font-size: 15px;
  }
}
.underline {
  position: relative;
  &:after {
    position: absolute;
    left: 16px;
    right: 16px;
    bottom: 0;
    height: 1px;
    background: #d5d5d5;
    content: "";
    transform: scaleY(.5);
  }
}
.arrow{
  transform: rotate(90deg);
}
</style>
