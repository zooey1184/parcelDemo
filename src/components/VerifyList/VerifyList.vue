<template>
  <div class="verify_list_wrap">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "verify-list",
  data: ()=> ({
    showPane: false
  }),
  methods: {

  },
}
</script>

<style scoped>
.verify_list_animate_wrap {
  position: relative;
}
</style>
