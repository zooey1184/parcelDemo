<!-- 当前组件选自滴滴组件scroll, 做了一些修改 -->
<template>
<div ref="wrapper" class="list-wrapper" :style="{height: `${minH}px`}">
  <!-- <div ref="wrapper" class="list-wrapper" :style="{height: `${minH}px`}"> -->
  <div class="scroll-content" :style="{paddingBottom: `${wrapperTop}px`}">
    <div ref="listWrapper">
      <slot></slot>
    </div>

    <div v-if="pullUpLoad" class="pullup-load">
      <slot name="pullup" :pullUpLoad="pullUpLoad" :isPullUpLoad="isPullUpLoad">
        <div class="pullup-wrapper" v-if="pullUpLoad">
          <div class="before-trigger pull_upLoad" v-if="!isPullUpLoad">
            <span>{{pullUpTxt}}</span>
          </div>
          <div class="after-trigger" v-else>
            <loading></loading>
          </div>
        </div>
      </slot>
    </div>
  </div>

  <div v-if="pullDownRefresh">
    <slot name="pulldown" :pullDownRefresh="pullDownRefresh" :pullDownStyle="pullDownStyle" :beforePullDown="beforePullDown" :isPullingDown="isPullingDown" :bubbleY="bubbleY">
      <div ref="pulldown" class="pulldown-wrapper" :style="pullDownStyle" v-if="pullDownRefresh">
        <div class="before-trigger" v-if="beforePullDown">
          <bubble :y="bubbleY"></bubble>
        </div>
        <div class="after-trigger" v-else>
          <div v-if="isPullingDown" class="loading_scroll">
            <loading></loading>
          </div>
          <div v-else><span>{{refreshTxt}}</span></div>
        </div>
      </div>
    </slot>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import Loading from './loading.vue'
import Bubble from './bubble.vue'
const COMPONENT_NAME = 'scroll'
const DIRECTION_H = 'horizontal'
const DIRECTION_V = 'vertical'

export default {
  name: COMPONENT_NAME,
  props: {
    data: {
      type: Array,
      default: function() {
        return []
      }
    },
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    listenScroll: {
      type: Boolean,
      default: false
    },
    listenBeforeScroll: {
      type: Boolean,
      default: false
    },
    directions: {
      type: String,
      default: DIRECTION_V
    },
    scrollbar: {
      type: null,
      default: false
    },
    pullDownRefresh: {
      type: null,
      default: false
    },
    pullUpLoad: {
      type: null,
      default: false
    },
    startY: {
      type: Number,
      default: 0
    },
    refreshDelay: {
      type: Number,
      default: 20
    },
    freeScroll: {
      type: Boolean,
      default: false
    },
    mouseWheel: {
      type: Boolean,
      default: false
    },
    pullDownTop: {
      type: Number,
      default: 50
    },
    wrapperTop: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      beforePullDown: true,
      isRebounding: false,
      isPullingDown: false,
      isPullUpLoad: false,
      pullUpDirty: true,
      pullDownStyle: '',
      bubbleY: 0,
      minH: '100%',
      toJSON: ()=> {},
    }
  },
  computed: {
    pullUpTxt() {
      // 上拉加载的文案配置
      const moreTxt = this.pullUpLoad && this.pullUpLoad.moreTxt  || "查看更多"
      const noMoreTxt = this.pullUpLoad && this.pullUpLoad.noMoreTxt  || "没有更多"
      return this.pullUpDirty ? moreTxt : noMoreTxt
    },
    refreshTxt() {
      return this.pullDownRefresh && this.pullDownRefresh.txt || "刷新成功！"
    },

  },
  created() {
    const top = this.pullDownTop
    this.pullDownInitTop = -top
    if(this.pullDownRefresh) {
      this.pullDownStyle = `top:${(-top)}px`
    }
  },
  mounted() {
    setTimeout(() => {
      let h = this.getRect('listWrapper').height
      let p = this.clientRect()
      let bottomH = 0
      // this.minH = p.h>=h ? `${h-1}` : p.h
      let s = window.localStorage
      let offset = 0
      if(!!s.pageRect && JSON.parse(s.pageRect)) {
        let ss = JSON.parse(s.pageRect)
        offset = this.getRect('listWrapper').top
        bottomH = this.getRect('listWrapper').bottom
      }
      h = this.$refs.listWrapper.offsetHeight
      console.log(this.$refs.wrapper.offsetTop,'22222',this.getRect('listWrapper').bottom, '2222222')
      console.log(p, h ,'111', offset,'222','高度计算', this.$refs.wrapper.offsetTop)
      if (offset) {
        this.minH = p.h -offset- 20
      } else {
        this.minH = p.h -this.$refs.wrapper.offsetTop- 20
      }
      
      console.log(this.minH); 
      setTimeout(()=> {
        this.initScroll()
      }, 180)
    }, 100)
  },
  methods: {
    // 获取屏幕可视宽高
    clientRect() {
      console.log(2222222)
      let posi = {
        w: 375,
        h: 603
      }
      if (window.innerWidth == undefined) {
        posi.w = document.documentElement.clientWidth;
        posi.h = document.documentElement.clientHeight;
      } else {
        posi.w = window.innerWidth;
        posi.h = window.innerHeight;
      }
      return posi
    },
    // 初始化处理
    initScroll() {
      console.log(222222)
      if (!this.$refs.wrapper) {
        return
      }
      if (this.$refs.listWrapper && (this.pullDownRefresh || this.pullUpLoad)) {
        // console.log(this.minH);
        this.$refs.listWrapper.style.minHeight = `${this.minH - 1 }px`
      }
      let options = {
        probeType: this.probeType,
        click: this.click,
        scrollY: this.freeScroll || this.directions === DIRECTION_V,
        scrollX: this.freeScroll || this.directions === DIRECTION_H,
        scrollbar: this.scrollbar,
        pullDownRefresh: this.pullDownRefresh,
        pullUpLoad: this.pullUpLoad,
        startY: this.startY,
        freeScroll: this.freeScroll,
        mouseWheel: this.mouseWheel,
      }
      this.scroll = new BScroll(this.$refs.wrapper, options)
      // 滚动
      if (this.listenScroll) {

        this.scroll.on('scroll', (pos) => {
          this.$emit('scroll', pos)
          console.log(pos);
        })
      }
      // 上下拉刷新监听滚动
      if (this.listenBeforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          this.$emit('beforeScrollStart')
        })
      }
      // 是否下拉刷新处理
      if (this.pullDownRefresh) {
        this._initPullDownRefresh()
      }
      // 是否上拉加载
      if (this.pullUpLoad) {
        this._initPullUpLoad()
      }
    },
    // 获取元素dom
    getRect(ref) {
      let r = this.$refs[ref].getBoundingClientRect()
      return r
    },
    disable() {
      this.scroll && this.scroll.disable()
    },
    enable() {
      this.scroll && this.scroll.enable()
    },
    // 重新计算scroll
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    },
    destroy() {
      this.scroll.destroy()
    },
    // 当无新数据的时候需要调用，以结束当前上下刷新加载
    forceUpdate(dirty) {
      if (this.pullDownRefresh && this.isPullingDown) {
        this.isPullingDown = false
        this._reboundPullDown().then(() => {
          this._afterPullDown()
        })
      } else if (this.pullUpLoad && this.isPullUpLoad) {
        this.isPullUpLoad = false
        this.scroll.finishPullUp()
        this.pullUpDirty = dirty
        this.refresh()
      } else {
        this.refresh()
      }
    },
    _initPullDownRefresh() {
      this.scroll.on('pullingDown', () => {
        this.beforePullDown = false
        this.isPullingDown = true
        console.log('10')
        this.$emit('pullingDown')
      })
      this.scroll.on('scroll', (pos) => {
        if (!this.pullDownRefresh) {
          return
        }
        if (this.beforePullDown) {
          this.bubbleY = Math.max(0, pos.y + this.pullDownInitTop)
          this.pullDownStyle = `top:${Math.min(pos.y + this.pullDownInitTop, 10)}px`
        } else {
          this.bubbleY = 0
        }
        if (this.isRebounding) {
          this.pullDownStyle = `top:${10 - (this.pullDownRefresh.stop - pos.y)}px`
        }
      })
    },
    _initPullUpLoad() {
      this.scroll.on('pullingUp', () => {
        this.isPullUpLoad = true
         console.log('101')
        this.$emit('pullingUp')
      })
    },
    _reboundPullDown() {
      const {
        stopTime = 600
      } = this.pullDownRefresh
      return new Promise((resolve) => {
        setTimeout(() => {
          this.isRebounding = true
          this.scroll.finishPullDown()
          resolve()
        }, stopTime)
      })
    },
    _afterPullDown() {
      setTimeout(() => {
        this.pullDownStyle = `top:${this.pullDownInitTop}px`
        this.beforePullDown = true
        this.isRebounding = false
        this.refresh()
      }, this.scroll.options.bounceTime)
    }
  },
  watch: {
    // 监听数据，判断是否需要再加载数据
    data() {
      setTimeout(() => {
        if(!this.data || this.data.length === 0) {
           this.forceUpdate(false)
        } else {
           this.forceUpdate(true)
        }

      }, this.refreshDelay)
    }
  },
  components: {
    Loading,
    Bubble
  }
}
</script>

<style lang="less">
.list-wrapper {
  position: relative;
  .scroll-content {
    position: relative;
    z-index: 1;
  }
  .list-content {
    position: relative;
    z-index: 10;
    background: #fff;
    .list-item {
      height: 60px;
      line-height: 60px;
      font-size: 18px;
      padding-left: 20px;
      border-bottom: 1px solid #e5e5e5;
    }
  }
}
.pulldown-wrapper {
  position: absolute;
  width: 100%;
  left: 0;
  top: -50;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all;
  .after-trigger {
    // margin-top: 10px;
    color: #4678e7 !important;
    font-size: 12px !important;
  }
}
.pullup-load {
    width: 100%;
    /*height: 10px;*/
    display: block;
    position: relative;
}
.pullup-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 0;
  position: relative;
  bottom: -30px;
 /* width: 100%;
  position: relative;
  bottom: 0;
  text-align: center;*/
  .before-trigger {
    span {
      font-size: 12px !important;
      color: #eaeaea !important;
    }
  }
}

</style>
