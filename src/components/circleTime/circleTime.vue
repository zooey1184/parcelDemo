<template>
  <div class="game_time">
    <div class="hold">
      <div class="pie pie1"></div>
    </div>
    <div class="hold">
      <div class="pie pie2"></div>
    </div>
    <div class="bg"> </div>
    <div class="time">
      <div class='tip1' v-if="isShowTip1">您可能需要等待</div>
      <div class='tip2' v-if="isShowTip1">一分钟</div>
      <div class='tip1' v-if="isShowTip2">认证时间较长请耐心等待</div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
export default {
  name: "circle-time",
  data() {
    return {
      i: 0,
      j: 0,
      count: 0,
      MM: 0,
      SS: 60,
      MS: 0,
      totle: 0,
      d: 0,
      gameTime: 60,
      isShowTip1: true,
      isShowTip2: false
    }
  },
  created() {
    this.totle = (this.MM + 1)* 600
    this.d = 180 * (this.MM + 1)
    this.MM = '0' + this.MM
    this.countDown()
  },
  methods: {
    showTime() {
      this.totle = this.totle - 1;
      if (this.totle == 0) {
          clearInterval(this.s);
          clearInterval(this.t1);
          clearInterval(this.t2);
          console.log(this.d, ' ---------')
          $(".pie2").css("-o-transform", "rotate(" + 0 + "deg)");
          $(".pie2").css("-moz-transform", "rotate(" + 0  + "deg)");
          $(".pie2").css("-webkit-transform", "rotate(" + 0 + "deg)");
          $emit('lastTime','zero')
      } else {
          if (this.totle > 0 && this.MS > 0) {
              this.MS = this.MS - 1;
              if (this.MS < 10) {
                 this.MS = "0" + this.MS
              }
              ;
          }
          ;
          if (this.MS == 0 && this.SS > 0) {
              this.MS = 10;
              this.SS = this.SS - 1;
              if (this.SS < 10) {
                  this.SS = "0" + this.SS
              }
          }
          if (this.SS == 0 && this.MM > 0) {
              this.SS = 60;
              this.MM = this.MM - 1;
              if (this.MM < 10) {
                  this.MM = "0" + this.MM
              }
          }
      }
      if(this.SS%12 === 0) {
        this.isShowTip1 = false
        this.isShowTip2 = true
      } else if(this.SS%6 === 0) {
        this.isShowTip1 = true
        this.isShowTip2 = false
      }
    },
    start1() {
      //i = i + 0.6;
      this.i = this.i + 360/((this.gameTime)*10);  //旋转的角度  90s 为 0.4  60s为0.6
      this.count = this.count + 1;
      if(this.count <= (this.gameTime/2*10)){  // 一半的角度  90s 为 450
        $(".pie1").css("-o-transform","rotate(" + this.i + "deg)");
        $(".pie1").css("-moz-transform","rotate(" + this.i + "deg)");
        $(".pie1").css("-webkit-transform","rotate(" + this.i + "deg)");
      }else{
        $(".pie2").css("backgroundColor", "#4A98F7");
        $(".pie2").css("-o-transform","rotate(" + this.i + "deg)");
        $(".pie2").css("-moz-transform","rotate(" + this.i + "deg)");
        $(".pie2").css("-webkit-transform","rotate(" + this.i + "deg)");
      }
    },
    start2() {
        this.j = this.j + 0.6;
        this.count = this.count + 1;
        if (this.count == 300) {
            this.count = 0;
            clearInterval(this.t2);
            this.t1 = setInterval("start1()", 100);
        }
      $(".pie2").css("-o-transform","rotate(" + this.j + "deg)");
      $(".pie2").css("-moz-transform","rotate(" + this.j + "deg)");
      $(".pie2").css("-webkit-transform","rotate(" + this.j + "deg)");
    },
    countDown() {
      //80*80px 时间进度条
      this.i = 0;
      this.j = 0;
      this.count = 0;
      this.MM = 0;
      this.SS = this.gameTime;
      this.MS = 0;
      this.totle = (this.MM + 1) * this.gameTime * 10;
      this.d = 180 * (this.MM + 1);
      this.MM = "0" + this.MM;

      this.showTime();

      this.s = setInterval(()=>{this.showTime()}, 100);
      this.start1();
      //start2();
      this.t1 = setInterval(()=>{this.start1()}, 100);
    },

  }
}
</script>
<style lang="less" scoped>
.game_time{
  width: 100px;
  height: 100px;
  position: relative;
  text-align: center;
  margin: 0 auto;
  margin-top: 20px;
  padding-right: 115px;
}

/* time scroll*/
.pie{
  width:200px;
  height:200px;
  background-color:#F6F6F6;
  border-radius:100px;
  position:absolute;
}
.pie1{
  clip:rect(0px,200px,200px,100px);
  transform: rotate(0deg);
  -o-transform:rotate(0deg);
  -moz-transform:rotate(0deg);
  -webkit-transform:rotate(0deg);
  background-color:#F6F6F6;
}
.pie2{
  clip:rect(0px,100px,200px,0px);
  transform: rotate(0deg);
  -o-transform:rotate(0deg);
  -moz-transform:rotate(0deg);
  -webkit-transform:rotate(0deg);
  background-color:#F6F6F6;
}
.hold{
  width:200px;
  height:200px;
  position:absolute;
  z-index:1;
}
.bg{
  width:200px;
  height:200px;
  border-radius:200px;
  position:absolute;
  background-color:#4A98F7;
}
.time{
  width:184px;
  height:184px;
  margin:8px 0 0 8px;
  background-color:#fff;
  border-radius:184px;
  position:absolute;
  z-index:1;
  text-align:center;
  line-height:1;
  font-size:16px;
  .tip1 {
    position: relative;
    margin-top: 70px;
    line-height: 30px;
    font-size: 15px;
    color: #B6B5B5;
    font-weight: normal;
  }
 .tip2 {
    font-size: 15px;
    color: #B6B5B5;
    font-weight: normal;
  }
}
</style>
