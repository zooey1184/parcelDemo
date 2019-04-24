<!-- 复选框提供两种方式 -->
<!-- 该选择框是input作为slot，其中不做input转换，v-model为vue自带，可以多选数组方式，常用多选 -->
<template>
  <span class="form__checkbox" ref="checked">
    <div class="checkbox_img" :style="{width: `${wh}px`, height: `${wh}px`}">
      <slot name='input'></slot>
      <div class="checked_icon" v-if="checked">
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
  data: ()=> ({
    value: ''
  }),
  props: {
    check: {
      type: Array,
      default: ()=> ([])
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
    },
    checked() {
      let a = this.check
      let b = a.some((item, index, arr)=> {
        return item==this.value
      })
      return b
    }
  },
  mounted() {
    let v = this.$refs.checked.children[0].children[0].value
    this.value = v
  }
}
</script>

<style lang="less">
.form__checkbox {
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
