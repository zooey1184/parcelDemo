<template>
  <div class="" :style="{background: `${background}`}">
    <div class="img_slot" :style="{paddingTop: `${paddingTop}px`}">
      <slot>
        <img src="//r.51gjj.com/resource/tanyuanbao/waiting.png" alt="">
      </slot>
    </div>
    <div class="desc_pane" v-if="title">
      <p class="title_pane" v-html="title"></p>
    </div>
    <div class='desc_sub'>
      <slot name='desc'>
        <p class="desc_panes" v-html="desc"></p>
      </slot>
    </div>
    <button class="submit_button" @click="changeFn">{{btn}}</button>
    <slot name='other'></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '系统正在审核中...'
    },
    desc: {
      type: String,
      default: '不要着急呀，系统审核速度很快的'
    },
    btn: {
      type: String,
      default: '确定'
    },
    paddingTop: {
      type: Number,
      default: 61
    },
    background: {
      type: String,
      default: '#fff'
    }
  },
  methods: {
    changeFn() {
      this.$emit('change')
    }
  }
}
</script>

<style lang="less">
@import url('../../common/css/init.less');
* {
  margin: 0;
  padding: 0;
}
.img_slot {
  display: block;
  position: relative;
  // margin-top: 103px;
  img {
    width: 81px;
    display: block;
    margin: 0 auto;
  }
}
.desc_pane {
  margin-top: 18px;
  height: 58px;
  .title_pane {
    font-size: 15px;
    line-height: 18px;
    color: #2C3946;
    text-align: center;
  }
}
.desc_sub {
  font-size: 13px;
  text-align: center;
  color: #989595;
  height: 61px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.submit_button {
  .footer_btn;
  width: 80%;
  position: relative;
  text-align: center;
  font-size: 16px;
  margin-top: 37px;
  display: block;
  line-height: 42px;
}
</style>
