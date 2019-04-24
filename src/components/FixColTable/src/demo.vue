<template>
  <div class="page">
    <div class="table">
      <fix-col-table :col='table' :row='row'></fix-col-table>
    </div>
  </div>
</template>

<script>
import fixColTable from './FixColTable'

export default {
  data: ()=> ({
    table: [
      {
        text: '第一列', 
        value: 'aa'
      },
      {
        text: '第二列', 
        value: 'bb'
      }
    ],
    row: [
      {
        aa: '1', 
        bb: '2'
      },
      {
        aa: 'aaaa',
        bb: '2', 
      },
    ]
  }),
  components: {
    fixColTable
  }
}
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box
}
.page {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.table {
  position: relative;
  width: 100%;
  padding: 10px;
}
</style>
