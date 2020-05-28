<script>
import {onMounted,provide,ref,markRaw,reactive} from "vue";
import CompUser from "@/components/user.vue"
import {useDebounce,useResize} from '@/hooks'

export default {
  components:{
    CompUser
  },
  props: {
    msg: {
      type:String,
      default:'Hello Vue'
    }
  },
  setup(){
// const pic='https://tva1.sinaimg.cn/large/007S8ZIlly1gf79tdzjqtj309w09w3yg.jpg'
    //父组件冒泡共享数据pic
    // provide('pic',pic)
    //也支持传递响应式数据
    const pic = ref('https://tva1.sinaimg.cn/large/007S8ZIlly1gf79tdzjqtj309w09w3yg.jpg');
    provide('pic',pic)
    // ref 组件实例获取
    const comRef = ref(null);

    onMounted(() => {
      //获取子组件实例，调用其内部函数
      console.log(comRef.value.getName())
    })

     const foo = markRaw({
     nested:true
    })
    const bar = reactive({
      nested: foo.nested
    })
    console.log(bar)
    console.log(foo)

    const {width,height} = useResize()


    return {
      width,
      height,
      comRef,
      text:useDebounce()
    }
  }
}
</script>
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    屏幕width:{{ width }}
    屏幕height:{{ height }}
    <comp-user
      ref="comRef"
      :user-name="'用户名'"
    />

    <!-- customRef实现防抖 -->
    {{ text }}
    <input v-model="text">
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
