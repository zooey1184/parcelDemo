<template>
  <div class="contain">
    <div :class="[`item_${item}`]" v-for="item in 9" :key='item' @click='pick(item)'>
      <p>{{item}}</p>
    </div>
  </div>
</template>

<script>
import { async } from 'q';
export default {
  name: 'demo',
  methods: {
    pick(i) {
      console.log(i);
      let len = this.pickone().length
      if(len>=i) {
        this.pickone()[i-1].fn()
      } else {
        console.log('该方法暂时还没建立')
      }
    },
    pickone() {
      let one = ()=> {
        return new Promise((res, rej)=> {
          setTimeout(()=> {
            res(23)
          }, 3000)
        })
      }
      let oneFn = ()=> {
        one().then(r=> {
          console.log(`res: ${r}`)
          return 2323
        }).then(r=> {
          console.log(r)
        })
      }
      let twoFn = function(){
        
        function timeout(ms) {
          return new Promise((resolve) => {
            setTimeout(resolve, ms);
          });
        }

        async function asyncPrint(value, ms) {
          await timeout(ms);
          console.log(value)
          await new Promise(res=> {
            setTimeout(()=> {
              res(43)
            }, 500)
          }).then(r=> {
            console.log(r)
          })
        }

        asyncPrint('hello world', 1500);
      }
      return [
        { fn: oneFn}, {fn: twoFn}
      ]
    }
  },
}
</script>

<style lang="less">
.contain {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(3, 100px);
  gap: 20px 20px;
  color: #fff;
  font-size: 2em;
  grid-auto-flow: column;
  justify-content: center;
  .item(@i:1) when(@i<=9) {
    .item_@{i} {
      background: #111*@i;
    }
    .item(@i+1);
  }
  .item(1);
  .item_1 {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 3;
  }
}
</style>
