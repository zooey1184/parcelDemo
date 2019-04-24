<!-- switch是否选择器checkbox的衍生，v-model转换，只有Boolean -->
<template>
  <span class="form__switch">
    <div class="switch_box">
      <input type="checkbox" v-bind:checked="checked" v-on:change="$emit('change', $event.target.checked)">
      <transition name="bounce_switch">
        <div class="bg_switch" :style="{background: background}" v-if="checked"></div>
      </transition>
      <div class="circle" :class="{active: checked}"></div>
    </div>
  </span>
</template>

<script>
export default {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean,
    background: {
      type: String,
      default: 'rgb(29, 199, 20)'
    },
  }
}
</script>

<style lang="less">
.form__switch {
  display: flex;
  align-items: center;
  position: relative;
  .switch_box {
    width: 30px;
    height: 20px;
    border: 1px solid #eee;
    border-radius: 30px;
    background: #ddd;
    overflow: hidden;
    position: relative;
    .switch_icon {
      position: absolute;
      left: 0;
      top: 0;
      width: 80%;
      left: 10%;
      top: 15%;
    }
    .bg_switch {
      background: rgb(38, 148, 228);
      width: 100%;
      left: 0;
      height: 100%;
      border-radius: 30px;
      transform-origin: 0 50%;
      top: 0;
    }
    .circle {
      width: 20px;
      height: 20px;
      background: #fff;
      box-shadow: 2px 2px 2px #ddd;
      border-radius: 40px;
      position: absolute;
      left: 0;
      top: 0;
      transition: all .4s linear;
      img {
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }
    .active {
      transform: translate(11px);
    }
  }
  input {
    position: absolute;
    width: 100%;
    left: 0;
    height: 100%;
    top: 0;
    z-index: 5;
    opacity: 0;
  }
}
.bounce_switch-enter, .bounce_switch-leave-to {
  transform: scaleX(0);
  opacity: 0;
}
.bounce_switch-enter-active, .bounce_switch-leave-active {
  transition: all .4s ease-out;
}
</style>
