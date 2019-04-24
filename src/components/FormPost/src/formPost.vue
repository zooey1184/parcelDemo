<template>
  <div v-if='showForm' class="formPost--full">
    <form :action="action" ref='submit' :method="type">
      <div  v-if='params.length>0'>
        <input 
        v-for='(item, index) in params' 
        :key='index' 
        type="hidden" 
        :value='item.value' 
        :name='item.name'>
      </div>
      <input class="submit__form" type="submit" @click='submitFn'>
    </form>
  </div>
</template>

<script>
export default {
  name: 'form-page',
  data: ()=> ({
    action: '',
    type: 'POST',
    params: [],
    showForm: false,
  }),
  methods: {
    submitFn() {
      setTimeout(()=> {
        let formD = this.$refs.submit 
        formD.submit()
      }, 100)
    }
  }
}
</script>

<style lang="less">
.formPost--full {
  position: absolute;
  width: 0;
  height: 0;
  left: 0;
  z-index: -10;
  opacity: 0;
  .submit__form {
    position: absolute;
    width: 0;
    height: 0;
  }
}
</style>

