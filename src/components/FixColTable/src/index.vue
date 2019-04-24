<template>
  <div class="fix_table_col">
    <table class="fix_table" border='0' cellpadding='0' cellspacing='0'>
      <tr class="t_head">
        <td style='background: rgb(214, 40, 96); color: #fff'>{{colName.f.text}}</td>
      </tr>
      <tr v-for='(item, index) in row' :key='index' >
        <td>{{item[colName.f.value]}}</td>
      </tr>
    </table>
    <div class='scroll_table'>
      <table style="width: 100%" border='0'  cellpadding='0' cellspacing='0'>
        <tr class="t_head">
          <td v-for='(i, k) in colName.o' :key='k'>{{i.text}}</td>
        </tr>
        <tr v-for='(item, index) in row' :key='index' >
          <td v-for='(i, k) in colName.o' :key='k'>{{item[i.value]}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'fix-col-table',
  props: {
    title: String,
    col: {
      type: Array,
      default: ()=> ([])
    },
    row: {
      type: Array,
      default: ()=> ([])
    }
  },
  computed: {
    colName: function() {
      let c = this.col
      let f = c[0]
      let a = []
      for(let i=1; i<c.length; i++) {
        a.push(c[i])
      }
      return {
        f: f, // 第一列
        o: a  // 其余列
      }
    }
  },
}
</script>

<style lang="less" scoped>
table {
  font-size: 12px;
  border: 1px solid #eee;
  tr {
    &:nth-child(2n+1) {
      background: #fafafa;
    }
  }
  td {
    text-align: center;
    height: 38px;
    min-width: 80px;
  }
}
.table_wrap {
  position: relative;
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  margin-bottom: 20px;
}
.fix_table {
  position: relative;
  width: 100px;
  background: #fff;
  z-index: 20;
  border-right: 1px solid #ddd;
  box-shadow: 2px 0 3px #ddd;
}
.scroll_table {
  position: absolute;
  width: 100%;
  box-sizing: border-box;
  padding-left: 110px;
  padding-top: 10px;
  left: 0;
  overflow: auto;
  top: 0;
  min-width: 200px; 
  overflow-x: auto; 
  overflow-y: hidden
}
</style>
