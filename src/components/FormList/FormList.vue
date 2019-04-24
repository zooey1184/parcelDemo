<template>
  <div class="form_list_wrap" :style='{padding: padding}'>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "form-list",
  props: {
    padding: {
      type: String,
      default: '0'
    }
  }
}
</script>

<style lang="less">
.form_list_wrap {
  padding: 0;
}
</style>
