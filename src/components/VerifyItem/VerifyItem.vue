<template slot-scope="props">
  <div class="">
    <transition :name="name">
      <div class="verify_item_wrap" v-show="showItem" :class="{underline: getUnderLine || showUnderLine}" :style="{transitionDelay: animateSec, height: `${height}px` }">
        <div class="verify_item_contain_left">
          <div class="left_img" :style="{width: `${leftW}px`}">
            <slot name="image">
              <!-- 默认图片位置 -->
            </slot>
          </div>
          <div class="left_text" :style="{left: `${leftW}px`}">
            <div class="text_pane" v-if="middle=='text'">
              <h4>{{title}}</h4>
              <p>{{desc}}</p>
            </div>
            <div class="self_pane_slot_wrap" v-else>
              <slot>
                <!-- 默认内容可自定义 -->
              </slot>
            </div>
          </div>
        </div>
        <div class="verify_item_contain_right" v-if="showRight" :style="{paddingTop: `${(height-20)/2}px`}">
          <div class="right_text">
            <slot name='status'>
              <p :style="{color: (getState==1 ? pickColor : color)}">{{status}}</p>
            </slot>
          </div>
          <div class="right_img">
           <img :src="getState==1 ? grayArrowUrl : blackArrowUrl" alt="">
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
export default {
  name: "verify-item",
  props: {
    title: [String, Number],
    desc: [String, Number],
    status: [String, Number],
    state: [String, Number],
    middle: {
      type: String,
      default: 'self'
    },
    showRight: {
      type: Boolean,
      default: true
    },
    showUnderLine: {
      type: Boolean,
      default: false
    },
    height: {
      type: Number,
      default: 66
    },
    line: {
      type: String,
      default: 'part'
    },
    lineOffsetLeft: {
      type: Number,
      default: 0
    },
    lineOffsetRight: {
      type: Number,
      default: 0
    },
    leftW: {
      type: Number,
      default: 60
    }
  },
  data: ()=> ({
    node: null,
    color: "#2A2A2A",
    pickColor: '#9B9B9B',
    currentIndex: null,
    name: "fade",
    showItem: false,
    grayArrowUrl: '//r.51gjj.com/resource/simpleLoan/img/arrow_gray.png',
    blackArrowUrl: '//r.51gjj.com/resource/simpleLoan/img/arrow_black.png'
  }),
  computed: {
    getState: function() {
      return this.state
    },
    getUnderLine: function() {
      let show = false
      let node = this.$parent.$children.length
      let i = this.getIndex()
      if(node-1>i) {
        show = true
      }else {
        show = false
      }
      return show
    },
    animateSec: function() {
      let i = this.getIndex()
      let s = `${i/10}s`
      return s
    }
  },
  methods: {
    getAttr() {
      let attr = this.$parent.$attrs
      if(!!attr.color) {
        this.color = attr.color
      }
      if(!!attr.name) {
        this.name = attr.name
      }
      if(!!attr.pickColor) {
        this.pickColor = attr.pickColor
      }
    },
    getNode() {
      this.node = this.$parent.$children.length
    },
    getIndex() {
      let node = this.$parent.$children.length
      let frist = 0
      let current = this._uid
      if(node>0) {
        if(!!this.$attrs.index) {
          current = this.$attrs.index
        }else {
          let uid = this.$parent.$children[0]._uid
          frist = uid
        }
      }
      let index = current-frist
      return index
    },
    // 自执行动画
    showFn() {
      setTimeout(()=> {
        this.showItem = true
      }, 10)
    }
  },
  mounted() {
    this.showFn()
    this.getAttr()
    this.getNode()
    this.getIndex()
    if(this.line=='full') {
      document.styleSheets[0].addRule('.underline:after',`left: ${this.lineOffsetLeft}px !important`);
      document.styleSheets[0].addRule('.underline:after', `right: ${this.lineOffsetRight}px !important`);
    }
  }
}
</script>

<style scoped lang='less'>
@import url("../../common/css/transition.less");
/* 整体布局 */
* {
  margin: 0;
  padding: 0;
}
.verify_item_wrap {
  position: relative;
  height: 72px;
  background: #fff;
  width: 100%;
  box-sizing: border-box;
}
.verify_item_contain_left {
  position: absolute;
  width: 70%;
  left: 12px;
  height: 100%;
  top: 0;
  .left_img {
    width: 60px;
    position: absolute;
    height: 100%;
    box-sizing: border-box;
    left: 0;
    top: 0;
    padding: 12px 0;
  }
  .left_text {
    position: absolute;
    min-width: 150px;
    left: 60px;
    // margin-top: 14px;
    top: 50%;
    transform: translateY(-50%);
    h4 {
      font-size: 16px;
      color: #333;
      font-weight: normal;
      line-height: 16px;
    }
    p {
      font-size: 13px;
      line-height: 13px;
      color: #868686;
      margin-top: 5px;
    }
  }
}
.verify_item_contain_right {
  position: absolute;
  right: 0;
  height: 100%;
  box-sizing: border-box;
  width: 30%;
  .right_img {
    position: absolute;
    right: 12px;
    width: 7px;
    img {
      width: 100%;
      position: relative;
    }
  }
  .right_text {
    font-size: 14px;
    position: absolute;
    right: 30px;
  }
}
/* 下划线 */
.underline {
  position: relative;
  &:after {
    position: absolute;
    content: "";
    bottom: 0;
    left: 72px;
    height: 1px;
    right: 12px;
    transform: scaleY(1);
    transform-origin: 0 0;
    background: #ededed
  }
}
</style>
