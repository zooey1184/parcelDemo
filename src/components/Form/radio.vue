<template>
  <span class="form__radio" ref="checked">
    <div class="radio_box" :style="boxStyle">
      <slot></slot>
      <transition name="bounce_radio">
        <div class="circle" :style="{background: pickColor}" v-if="picked">
          <img src="//r.51gjj.com/resource/common/icon/Check.png" alt="">
        </div>
      </transition>
    </div>
    <slot name='desc'></slot>
  </span>
</template>

<script>
export default {
  data: ()=> ({
    value: ''
  }),
  props: {
    pick: {
      type: [String, Number, Boolean],
      default: ""
    },
    wh: {
      type: [String, Number],
      default: 20
    },
    pickColor: {
      type: String,
      default: "#4375ea"
    }
  },
  computed: {
    boxStyle() {
      let obj = {
        width: `${this.wh}px`,
        height: `${this.wh}px`,
      }
      let act = {
        border: `1px solid ${this.pickColor}`,
      }
      Object.assign(act, obj)
      return this.picked ? act : obj
    },
    picked() {
      let c = this.pick==this.value? true : false
      return c
    }
  },
  mounted() {
    let v = this.$refs.checked.children[0].children[0].value
    console.log(v);
    this.value = v
  }
}
</script>

<style lang="less">
.form__radio {
  display: flex;
  align-items: center;
  position: relative;
  input {
    position: absolute;
    width: 100%;
    left: 0;
    height: 100%;
    top: 0;
    z-index: 5;
    opacity: 0;
  }
  .radio_box {
    width: 16px;
    height: 16px;
    border: 1px solid #aaa;
    border-radius: 30px;
    box-sizing: border-box;
    position: relative;
    display: inline-block;
    margin-right: 5px;
    overflow: hidden;
    .circle {
      width: 100%;
      height: 100%;
      box-sizing: content-box;
      border-radius: 20px;
      box-sizing: border-box;
      display: block;
      margin: 0 auto;
      img {
        width: 70%;
        left: 15%;
        position: relative;
        top: 0%;
      }
    }
    .radio_icon {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
      }
    }
  }
}
.bounce_radio-enter, .bounce_radio-leave-to {
  transform: scale(0);
  opacity: 0;
}
.bounce_radio-enter-active, .bounce_radio-leave-active {
  transition: all .3s ease-out;
}
</style>
