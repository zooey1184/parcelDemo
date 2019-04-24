<template>
<transition :name="name">
  <div class="f_i_w_v" ref='form' v-show="showItem" :style="{transitionDelay: animateSec, height: `${height}px` }">
    <div class="left" :style="leftStyle">
      <slot name='icon' v-if='showIcon'></slot>
      {{title}}
    </div>
    <div class="middle" :style="middleStyle">
      <div class="form_input__v2">
        <slot>
          <p>{{placeholder}}</p>
        </slot>
      </div>
    </div>
    <div class="right" v-if="showRight" :style="rightStyle">
      <slot name='status'>
        <p>{{status}}</p>
      </slot>
      <slot name='arrow'>
        <!-- <img src="//r.51gjj.com/image/static/ico_list_down.png" alt=""> -->
        <img src="//r.51gjj.com/image/static/ico_list_next.png" alt="">
      </slot>
    </div>
    <!-- <div class="underline_item" :style="lineStyle" ></div> -->
  </div>
</transition>
</template>

<script>
import mixin from '@/common/mixins/list_tpl.js'
import {clientRect} from '@/common/js/base'

export default {
  name: "form-item",
  mixins: [mixin],
  data: () => ({
    node: null,
    color: "#ff7800",
    currentIndex: null,
    name: "fade",
    showItem: false,
    height: 48,
    middleStyle: {},
    isShowUnderline: true
  }),
  props: {
    title: [String, Number],
    showIcon: {
      type: Boolean,
      default: false
    },
    showRight: {
      type: Boolean,
      default: true
    },
    width: {
      type: Number,
    },
    rightWidth: {
      type: Number,
      default: 20
    },
    status: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    line: {
      type: [Boolean, Object],
      default: true
    }
  },
  computed: {
    animateSec: function() {
      let i = this.getIndex()
      let s = `${i/10}s`
      return s
    },
    leftStyle: function() {
      let self = this
      let attr = this.getAttr()
      let w = self.width || attr.width
      let obj = {
        minWidth: `${w}px`,
        overflow: 'hidden',
      }
      return obj
    },
    // middleStyle: function() {
    //   let self = this
    //   let p = clientRect()
    //   let attr = this.getAttr()
    //   let width = self.width || attr.width
    //   let w = p.w-24-width
    //   if(this.showRight) {
    //     w = p.w-24-width-this.rightWidth
    //   }
    //   let obj = {
    //     width: `${w}px`,
    //     overflow: 'hidden',
    //     left: `${width+12}px`
    //   }
    //   return obj
    // },
    rightStyle: function() {
      let self = this
      let obj = {
        overflow: 'hidden',
        width: `${this.rightWidth}px`
      }
      return obj
    },
    lineStyle: function() {
      let obj = {
        width: '100%'
      }
      let attr = this.getAttr()
      if(this.line) {
        if(typeof this.line =='object') {
          obj = this.line
        }
      }else {
        if(attr.line) {
          if(typeof attr.line =='object') {
            obj = attr.line
          }
        }else {
          obj = {
            display: 'none'
          }
        }
      }
      return obj
    }
  },
  methods: {
    // 自执行动画
    showFn() {
      setTimeout(() => {
        this.showItem = true
      }, 10)
    },
    middleStyleFn() {
      let self = this
      let p = clientRect()
      let f = null
      try {
        f = this.$refs.form.getBoundingClientRect()
      } catch (e) {
        f.w = 0
      }
      let f_width = f.width>10 ? f.width : p.w
      let attr = this.getAttr()
      let width = self.width || attr.width
      let w = f_width-24-width
      if(this.showRight) {
        w = f_width-24-width-this.rightWidth
      }
      let obj = {
        width: `${w}px`,
        overflow: 'hidden',
        left: `${width+12}px`
      }
      // return obj
      this.middleStyle = obj
    }
  },
  mounted() {
    console.log(this.placeholder, ' placeholder')
    try {
      let attr = this.getAttr()
      setTimeout(()=> {
        this.middleStyleFn()
      }, 500)
      this.name = attr.name || 'fade'
      this.height = attr.height || 48
      this.showFn()
    } catch (e) {
      console.log(e);
    }
  }
}
</script>

<style lang="less">
.flexBlock {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
          align-items: center;
  height: 100%;
  position: relative;
}
.form_input__v2 {
  position: absolute;
  width: 100%;
  height: 100%;
  input {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    font-size: 15px;
    border: none;
    outline: none;
    margin: 0;
    padding: 0;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  }
  p {
    font-size: 14px;
    color: #666;
    line-height: 14px;
    margin: 0;
    position: absolute;
    top: 52%;
    transform: translateY(-50%);
    left: 0;
  }
}
.f_i_w_v {
  background: #fff;
  position: relative;
  width: 100%;
  overflow: hidden;
  height: 48px;
  padding: 0 12px;
  box-sizing: border-box;
  .left {
    padding: 16px 0;
    box-sizing: border-box;
    .flexBlock;
    position: absolute;
    top: 0;
    left: 12px;
    height: 100%;
    img {
      height: 20px;
      margin-right: 5px;
    }
  }
  .middle {
    flex-grow: 1;
    flex-shrink: 0;
    .flexBlock;
    position: absolute;
    top: 0;
    height: 100%;
  }
  .right {
    padding: 16px 0;
    box-sizing: border-box;
    .flexBlock;
    min-width: 20px;
    position: absolute;
    right: 12px;
    top: 0;
    height: 100%;
    justify-content: flex-end;
    img {
      width: 15px;
    }
  }
  .underline_item {
    position: absolute;
    height: 1px;
    left: 0;
    right: 0;
    bottom: 0;
    &:after {
      position: absolute;
      content: "";
      bottom: 0;
      left: 0;
      height: 1px;
      right: 0;
      transform: scaleY(1);
      transform-origin: 0 0;
      background: #ededed;
    }
  }
}

</style>
