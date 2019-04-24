<template>
  <div class="switch_page">
    <div class="input_content">
      <input type="text" v-model='switchC'>
      <button class='btn' @click='addLabel'>添加</button>
    </div>
    <div class="label_Pane">
      <label v-for='(item, index) in list' :key='index'>{{item}}</label>
    </div>
    <button class='btn' @click='setLabel'>设置</button>
    <button class='btn' @click='clearLabel'>清空</button>
  </div>
</template>

<script>
export default {
  data: ()=> ({
    switchC: '',
    list: []
  }),
  methods: {
    getLabel() {
      let list = sessionStorage.getItem('SWITCH') || "[]"
      let arr = JSON.parse(list)
      this.list = arr
    },
    addLabel() {
      if(this.switchC=='') return
      let arr = this.list
      arr.push(this.switchC)
      let s = new Set(arr)
      this.list = [...s]
      this.switchC = ''
    },
    setLabel() {
      sessionStorage.setItem('SWITCH', JSON.stringify(this.list))
    },
    clearLabel() {
      this.list = []
      sessionStorage.setItem('SWITCH', JSON.stringify(this.list))
    }
  },
  created(){
    this.getLabel()
  }
}
</script>

<style scoped lang="less">
.switch_page {
  padding: 20px;
  box-sizing: border-box;
}
.btn{
  display: inline-block;
  width: 80px;
  height: 35px;
  border: 1px solid #ddd;
  color: #fff;
  background: rgb(53, 192, 210);
  border-radius: 5px;
  outline: none;
  &:active {
    opacity: 0.8
  }
}
.input_content {
  input {
    height: 35px;
    border-radius: 5px;
    width: 200px;
    border: 1px solid #ddd;
    outline: none;
  }
}
.label_Pane {
  padding: 10px 0;
  label {
    margin-right: 20px;
    margin-top: 20px;
  }
}

</style>
