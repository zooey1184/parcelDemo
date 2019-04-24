<!-- 复选框提供两种方式 -->
<!-- 该选择框是input作为内嵌，v-model转换，只有Boolean，常用选择阅读协议等，样式简洁 -->
<template>
  <span class="form__checkbox">
    <div class="checkbox" :style="boxStyle" v-if="!imgMode">
      <input class="" type="checkbox" v-bind:checked="checked" v-on:change="$emit('change', $event.target.checked)">
      <img v-if="checked" class="checked_icon" src="//r.51gjj.com/resource/hualishu/hualuImg/tangehua/Check_form.png" alt="">
    </div>
    <div class="checkbox_img" v-else :style="{width: `${wh}px`, height: `${wh}px`}">
      <input class="" type="checkbox" v-bind:checked="checked" v-on:change="$emit('change', $event.target.checked)">
      <div class="checked_icon" v-if="checked" >
        <slot name='checked'>
          <img src="//r.51gjj.com/image/static/20161013-iocn-selected.png" alt="">
        </slot>
      </div>
      <div class="checked_icon" v-else>
        <slot name='unchecked'>
          <img src="//r.51gjj.com/image/static/20161013-iocn-select.png" alt="">
        </slot>
      </div>
    </div>
    <slot></slot>
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
      default: 'rgb(91, 157, 226)'
    },
    imgMode: {
      type: Boolean,
      default: true
    },
    wh: {
      type: [String, Number],
      default: 20
    }
  },
  computed: {
    boxStyle() {
      let obj = {
        width: `${this.wh}px`,
        height: `${this.wh}px`,
      }
      let act = {
        background: this.background,
        border: `1px solid ${this.background}`,
      }
      Object.assign(act, obj)
      return this.checked ? act : obj
    }
  }
}
</script>

<style lang="less">
.form__checkbox {
  display: flex;
  align-items: flex-start;
  position: relative;
  .checkbox {
    width: 16px;
    height: 16px;
    border: 1px solid #999;
    border-radius: 30%;
    display: inline-block;
    overflow: hidden;
    margin-right: 5px;
    position: relative;
    .checked_icon {
      position: absolute;
      left: 0;
      top: 0;
      width: 80%;
      left: 10%;
      top: 15%;
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

  .checkbox_img {
    width: 16px;
    height: 16px;
    box-sizing: border-box;
    position: relative;
    display: inline-block;
    margin-right: 5px;
    .checked_icon {
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
</style>
