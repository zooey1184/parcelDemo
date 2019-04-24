<template>
  <div>
    <transition name="fade">
      <div class="mark--full" v-if='showToast' :style='{background: bg}'></div>
    </transition>
    <transition :name="animate">
      <div class='alert__content' v-show='showToast' :style='{transitionDelay: "20ms"}'>
        <div class='content'>
          <h4 class="content__title" v-if='title'>{{title}}</h4>
          <img class="icon_close" v-if='showClose' @click='closeFn' src="./close.png" alt="">
          <p class='content__desc' v-if=msg v-html='msg'></p>
          <component v-if='tpl' :is='tpl'></component>
          <div class='btn__group' v-if='btn.length>0'>
            <p v-for='(item, index) in btn' :style='{color: item.color ? item.color: "rgb(43, 112, 245)" }' :class='{ lastBtn: showBtnLine(index), cancle_btn: item.type=="cancle"}' @click='actionFn(item.type)' :key='item.type'>{{item.text}}</p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'mark-pane',
  data: ()=> ({
    animate: 'fade',
    showToast: false,
    title: '',
    msg: '提示',
    color: '#fff',
    showClose: true,
    bg: 'rgba(0, 0, 0, 0.5)',
    tpl: null,
    showIcon: false,
    type: "",
    btn: [],
    showBtn: false,
    toJSON: '',
    touchindex: 99,
  }),
  computed: {
    btnFn: function(){
      let b = this.btn
      if(b.length>0) {
        this.showBtn = true
      }else {
        this.showBtn = false
      }
      return this.showBtn
    },
  },
  methods: {
    actionFn(item) {
      if(item && item=='cancle') {
        this.cancleFn()
      }else {
        this.confirmFn()
      }
      navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
      if (navigator.vibrate) {
        navigator.vibrate(30);
      }
    },
    showBtnLine(index) {
      let l = this.btn.length
      let b = true
      if(index+1>=l) {
        b = false
      }
      return b
    },
    cancleFn() {
      console.log('this is from cancle vue');
      this.$emit('cancle')
    },
    confirmFn() {
      console.log('this is from confirmFn');
      this.$emit('confirm')
    },
    closeFn() {
      console.log('close')
      this.showToast = false
    }
  }
}
</script>

<style scoped lang='less'>
@import '../../../common/css/transition.less';

* {
  margin: 0;
  padding: 0;
}
.full {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.flex {
  display: flex;
  align-items: center;
  justify-content: center;
}
.hide {
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
  z-index: -1;
}

.mark--full {
  .full;
  z-index: 9999;
  background: rgba(255, 255, 255, 0.5);
}
.alert__content {
  z-index: 9999;
  .full;
  .content {
    position: relative;
    width: 76%;
    left: 12%;
    top: 34%;
    border-radius: 5px;
    background: #fff;
    .content__title {
      font-size: 18px;
      font-weight: normal;
      color: #333;
      font-family: "微软雅黑";
      width: 100%;
      text-align: center;
      line-height: 18px;
      padding: 0;
      padding-top: 10px;
    }
    .icon_close {
      position: absolute;
      right: 10px;
      top: 10px;
      width: 15px;
      z-index: 49;
    }
    .content__desc {
      line-height: 18px;
      font-size: 16px;
      margin-bottom: 15px;
      color: #666;
      min-height: 35px;
      text-align: center;
    }
    .btn__group {
      display: flex;
      position: relative;
      width: 100%;
      height: 45px;
      font-size: 16px;
      align-items: center;
      &:before {
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        height: 1px;
        background: #ddd;
        content: "";
        transform: scaleY(0.5);
        transform-origin: 0 0;
      }
      p {
        display: inline-block;
        flex-grow: 1;
        flex-shrink: 0;
        font-size: 15px;
        text-align: center;
        color: rgb(43, 112, 245);
        height: 100%;
        .flex;
        position: relative;
      }
      .lastBtn {
        position: relative;
        &::after {
          position: absolute;
          top: 0;
          right: 0;
          width: 1px;
          height: 100%;
          background: #ddd;
          transform: scaleX(0.5);
          transform-origin: 0 0;
          content: ""
        }
      }
    }
  }
}
</style>
