<template>
  <div class="test">
    <h1>test count: {{ count }}</h1>
    <div>count * 2 = {{ doubleCount }}</div>
    <div>state from vuex {{ a }}</div>
    <button @click="add">
      add
    </button>
    <button @click="update">
      update a
    </button>
  </div>
</template>

<script>
import { ref,computed,watch,getCurrentInstance } from 'vue'
 export default {
   setup(){

      const { ctx } = getCurrentInstance()
      console.log(ctx.$router.currentRoute.value)

      // 对应 data 属性
      const count = ref(0)

      // methods 属性
      const add = ()=>{
        count.value++;
      };
      const update = () => {
        ctx.$store.commit('setTestA', count)
      }

      // computed
      const doubleCount = computed(()=>{
        return count.value*2
      });
      const a = computed(()=>{
        return ctx.$store.state.test.a
      })
      //对应 watch 函数
      watch(
        () => count.value,
        val => {
          console.log(`count is ${val}`)
        }
      );

      return {
        count,
        doubleCount,
        add,
        update,
        a
      }
   }
 }
</script>

<style lang="less" scoped>
.test {
  color: red;
}
</style>
