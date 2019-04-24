<template>
  <div class="action_sheet">
    <transition :name="wrapAnimate">
      <div class="actionSheet--full" v-if='showToast' :style='{background: bg}'></div>
    </transition>
    <transition :name="wrapAnimate">
      <div class='actionSheet__content' v-if='showToast' :style="{transitionDelay: '20ms'}" @click='cancle($event)'>
        <div class="content">
          <transition :name='animate'>
            <div class="data_list" v-show='showSheet' :style="{transitionDelay: animate=='fade' ? 0 : '100ms'}">
              <p v-for='(item, index) in list' :key='index' @click='selectFn(item, index)'>{{item.text}}</p>
            </div>
          </transition>
          <transition :name='animate'>
            <button class="btn_sheet" v-show='showSheet' :style="{transitionDelay: animate=='fade' ? 0 : '200ms'}" @click='cancleFn'>取消</button>
          </transition>
        </div>
      </div>
    </transition>
    <!-- <transition :name='animate'>
      <div class="data_list" v-show='showSheet' :style="{transitionDelay: animate=='fade' ? 0 : '100ms'}">
        <ul class="list_content">
          <li v-for='(item, index) in list' :key='index' @click='selectFn(item, index)'>
            {{item.text}}
          </li>
        </ul>
        <button class="btn_sheet" @click='cancleFn'>取消</button>
      </div>
    </transition> -->
  </div>
</template>

<script>
export default {
  name: 'action-sheet',
  data: ()=> ({
    showToast: false,
    showSheet: false,
    showAnimate: false,
    bg: 'rgba(0,0,0,0.5)',
    animate: 'slideC',
    list: [],
    wrapAnimate: 'fade'
  }),
  watch: {
    showAnimate: function(n, o) {
      if(n) {
        this.showToast = true
        setTimeout(()=> {
          this.showSheet = true
        }, 100)
      } else {
        this.showSheet = false
        setTimeout(()=> {
          this.showToast = false
        }, 320)
      }
    }
  },
  methods: {
    cancle($event) {
      if($event.target.classList.contains('actionSheet__content')) {
        this.showAnimate = false
      }
    },
    selectFn(item, index) {
      // this.cancleFn()
    },
    cancleFn() {
      this.showAnimate = false
    }
  }
}
</script>

<style scoped lang="less">
.action_sheet {
  .actionSheet--full {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 9;
    box-sizing: border-box;
    overflow: hidden;
  }
  .actionSheet__content {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    overflow: hidden;
    z-index: 99;
  }
  .content {
    position: absolute;
    bottom: 0;
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
    .data_list {
      border-radius: 15px;
      margin-bottom: 8px;
      background: #ffffff;
      overflow-x: hidden;
      overflow-y: auto;
      -webkit-overflow-scrolling : touch;
      max-height: 300px;
      p {
        height: 45px;
        font-size: 16px;
        line-height: 45px;
        text-align: center;
        color: #4375EA;
        position: relative;
        margin: 0;
        padding: 0;
        &:active {
          background: rgb(238, 238, 238);
        }
        &:after {
          content: "";
          position: absolute;
          width: 100%;
          bottom: 0;
          left: 0;
          height: 1px;
          background: #eee;
          transform: scaleY(0.7);
        }
        &:last-child {
          position: relative;
          &:after {
            content: "";
            position: absolute;
            width: 0;
            bottom: 0;
            left: 0;
            height: 1px;
            background: #333;
          }
        }
      }
    }
    .btn_sheet {
      width: 100%;
      height: 45px;
      font-size: 16px;
      color: #4375EA;
      background: #ffffff;
      overflow: hidden;
      border-radius: 15px;
      border: none;
      outline: none;
      &:active {
        background: rgb(238, 238, 238);
      }
    }
  }
}
// .data_list {
//   position: absolute;
//   padding: 10px;
//   bottom: 0;
//   z-index: 10;
//   width: 100%;
//   left: 0;
//   box-sizing: border-box;
//   .list_content {
//     position: relative;
//     background: #fff;
//     border-radius: 15px;
//     width: 100%;
//     list-style: none;
//     margin: 0;
//     padding: 0;
//     max-height: 200px;
//     overflow-y: scroll;
//     li {
//       height: 45px;
//       font-size: 16px;
//       line-height: 45px;
//       text-align: center;
//       color: #4375EA;
//       position: relative;
//       width: 100%;
//       margin: 0;
//       padding: 0;
//       &:active {
//         background: rgb(238, 238, 238);
//       }
//       &:after {
//         content: "";
//         position: absolute;
//         width: 100%;
//         bottom: 0;
//         left: 0;
//         height: 1px;
//         background: #eee;
//         transform: scaleY(0.7);
//       }
//       &:last-child {
//         position: relative;
//         &:after {
//           content: "";
//           position: absolute;
//           width: 0;
//           bottom: 0;
//           left: 0;
//           height: 1px;
//           background: #333;
//         }
//       }
//     }
//   }
//   .btn_sheet {
//     width: 100%;
//     height: 45px;
//     font-size: 16px;
//     color: #4375EA;
//     background: #ffffff;
//     overflow: hidden;
//     border-radius: 15px;
//     margin-top: 10px;
//     border: none;
//     outline: none;
//     &:active {
//       background: rgb(238, 238, 238);
//     }
//   }
// }
.slideC-enter-active, .slideC-leave-active{
  transition: all 0.32s ease-out
}
.slideC-enter, .slideC-leave-to {
  transform: translateY(100%);
  opacity: 0
}
.fade-enter-active {
  transition: all .2s ease-out;
}
.fade-leave-active {
  transition: all .2s ease-out;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
