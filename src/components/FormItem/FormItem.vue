<template>
<transition :name="name">
  <div class="f_i_w_v" v-show="showItem" :class='{underlineF: showUnderLine}' :style="{transitionDelay: animateSec, height: `${height}px` }">
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
      <slot name='status' v-if='status'>
        <p>{{status}}</p>
      </slot>
      <slot name='arrow'>
        <!-- <img src="//r.51gjj.com/image/static/ico_list_down.png" alt=""> -->
        <img src="//r.51gjj.com/image/static/ico_list_next.png" alt="">
      </slot>
    </div>
  </div>
</transition>
</template>

<script>
import mixin from '../../common/mixins/list_tpl.js'
import {clientRect} from '../../common/js/base'

export default {
  name: "form-item",
  mixins: [mixin],
  data: () => ({
    node: null,
    color: "#ff7800",
    currentIndex: null,
    name: "fade",
    showItem: false,
    w: null
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
    height: {
      type: Number,
      default: 48
    },
    width: {
      type: Number,
      default: 60
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
    showUnderLine: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    getUnderLine: function() {
      let show = false
      let node = this.$parent.$children.length
      let i = this.getIndex()
      if (node - 1 > i) {
        show = true
      } else {
        show = false
      }
      return show
    },
    animateSec: function() {
      let i = this.getIndex()
      let s = `${i/10}s`
      return s
    },
    leftStyle: function() {
      let self = this
      let obj = {
        minWidth: `${self.width}px`,
        overflow: 'hidden',
      }
      return obj
    },
    middleStyle: function() {
      let self = this
      let p = clientRect()
      let w = p.w-24-this.width
      if(this.showRight) {
        w = p.w-24-this.width-this.rightWidth
      }
      let obj = {
        width: `${w}px`,
        overflow: 'hidden',
        left: `${this.width+12}px`
      }
      return obj
    },
    rightStyle: function() {
      let self = this
      let obj = {
        overflow: 'hidden',
        width: `${this.rightWidth}px`
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
  },
  mounted() {
    try {
      let attr = this.getAttr()
      this.name = attr.name || 'fade'
      this.w = this.width || attr.width
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
    font-size: 14px;
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
    -webkit-transform: translateY(-50%);
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
  // display: flex;
  // align-items: center;

  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  .left {
    padding: 16px 0;
    -webkit-box-sizing: border-box;
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
    -webkit-box-flex: 1;
        -ms-flex-positive: 1;
            flex-grow: 1;
    -ms-flex-negative: 0;
        flex-shrink: 0;
    .flexBlock;
    position: absolute;
    top: 0;
    height: 100%;
  }
  .right {
    padding: 16px 0;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
    .flexBlock;
    min-width: 20px;
    position: absolute;
    right: 12px;
    top: 0;
    height: 100%;
    -webkit-box-pack: end;
        -ms-flex-pack: end;
            justify-content: flex-end;
    img {
      width: 15px;
    }
  }
}

/* 下划线 */
.underlineF {
  position: relative;
}
.underlineF::after {
  position: absolute;
  content: "";
  bottom: 0;
  left: 0;
  height: 1px;
  right: 0;
  -webkit-transform: scaleY(1);
          transform: scaleY(1);
  -webkit-transform-origin: 0 0;
          transform-origin: 0 0;
  background: #ededed;
}
</style>
