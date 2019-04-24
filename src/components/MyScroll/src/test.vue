<template>
  <section class="myscroll">
    <!-- 下拉刷新 -->
    <div class="pull-down">
      <div class="bar"><img :src="downLoadIcon" alt=""/><span class="text">{{pullDownText}}</span></div>
    </div>
    <!-- 上拉加载 -->
    <div class="pull-up" v-if="isShowPullUp">
      <div class="bar"><img :src="pullLoadIcon" alt=""/><span class="text">{{pullUpText}}</span></div>
    </div> 
  </section>
</template>

<script>
export default {
  name: 'reflashView',
  data: ()=> ({
    index:0,     //显示元素的索引
    slider:document.getElementsByTagName('body'),
    isScrolling: 0,
    startPos: {},
    isShowPullUp: false
  }),
  created() {
    // this.slider = this.slider || document.getElementByTagName('body')
    this.init()
  },
  mounted() {
    this.getDomClientHeight()
  },
  props: {
    downLoadIcon: {
      type: String,
      default: '//r.51gjj.com/act/release/img/20180518_licai_invite_icon.png'
    },
    pullLoadIcon: {
      type: String,
      default: '//r.51gjj.com/act/release/img/20180518_licai_invite_icon.png'
    },
    pullDownText: {
      type: String,
      default: '释放刷新'
    },
    pullUpText: {
      type: String,
      default: '上拉加载'
    },
    refreshDom: {
      type: Object
    }
  },
  watch: {

  },
  methods: {
    handleEvent:function(event){
        let _this = this;     //this指events对象
        if(event.type == 'touchstart'){
            _this.start(event);
        }else if(event.type == 'touchmove'){
            _this.move(event);
        }else if(event.type == 'touchend'){
            _this.end(event);
        }
    },
    //滑动开始
    start:function(event){
        let touch = event.targetTouches[0];     //touches数组对象获得屏幕上所有的touch，取第一个touch
        this.startPos = {x:touch.pageX,y:touch.pageY,time:+new Date};    //取第一个touch的坐标值
        this.isScrolling = 0;   //这个参数判断是垂直滚动还是水平滚动
        this.slider.addEventListener('touchmove',this,false);
        this.slider.addEventListener('touchend',this,false);
    },
    //移动
    move:function(event){
        //当屏幕有多个touch或者页面被缩放过，就不执行move操作
        if(event.targetTouches.length > 1 || event.scale && event.scale !== 1) return;
        let touch = event.targetTouches[0];
        this.endPos = {x:touch.pageX - this.startPos.x,y:touch.pageY - this.startPos.y};
        this.isScrolling = Math.abs(this.endPos.x) < Math.abs(this.endPos.y) ? 1:0;    //isScrolling为1时，表示纵向滑动，0为横向滑动
        if(this.isScrolling === 0){
            event.preventDefault();      //阻止触摸事件的默认行为，即阻止滚屏
        }
        // 边界限制
        if(this.endPos.y >= 180) this.endPos.y = 180
        if(this.endPos.y <= -80) this.endPos.y = -80
        this.slider.style.transform = `translateY(${this.endPos.y}px)`
    },
    //滑动释放
    end:function(event){
        this.resetPos()
        let duration = +new Date - this.startPos.time;    //滑动的持续时间
        if(this.isScrolling === 0){    //当为水平滚动时
          return
        }
        // 解绑事件
        this.slider.removeEventListener('touchmove',this,false);
        this.slider.removeEventListener('touchend',this,false);
    },
    // 回归原点
    resetPos() {
        this.slider.classList.add('release-anim')
        setTimeout(() => {
           this.slider.classList.remove('release-anim')
           this.slider.style.transform = `translateY(0px)`
        },1900)
    },
    // 获取屏幕高度
    getDomClientHeight() {
      let domHeight = this.slider.offsetHeight
      console.log(domHeight, '========')
    },
    // 初始化
    init() {
      let _this = this
      _this.slider = document.getElementsByTagName('body')[0]
      console.log(_this.slider)
     _this.slider.addEventListener('touchstart', (e) => {
        _this.start(e)
     },false);  
     this.getDomClientHeight()
    }
  }
}
</script>

<style lang='less'>
// transform: translateY(94px);
.myscroll {
  .pull-down {
    position: absolute;
    top: -30px;
    left: 40%;
    .bar {
      text-align: center;
      font-size: 14px;
      color: #4678e7;
      height: 30px;
      line-height: 30px;
      img {
        width: 24px;
        height: 24px;
      }
      .text {
        font-size: 14px;
        margin-left: 5px;
        position: relative;
        top: -7px;
      }
    }
  }
  .pull-up {
    .bar {
      text-align: center;
      font-size: 14px;
      color: #4678e7;
      height: 30px;
      line-height: 30px;
      img {
        width: 24px;
        height: 24px;
      }
      .text {
        font-size: 14px;
        margin-left: 5px;
        position: relative;
        top: -7px;
      }
    }
  }

}
.release-anim {
  transform: translateY(0px) !important;
  // transition-duration: 1s;
  transition:transform 2s ;
}
</style>
