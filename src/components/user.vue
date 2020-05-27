<script>
import {reactive,ref,isRef,isReactive,toRefs,computed,watch,watchEffect } from 'vue'
import { inject } from 'vue'
export default {
  props:{
    userName:{
      type:String,
      default:''
    }
  },
  setup(props,context){
    console.log('组件入口测试')
    console.log(`组件传递props${props.userName}`);
    console.log(`组件的上下文对象${JSON.stringify(context)}`);

     const getName=()=>{
            return "我是测试数据"
        }


    //A组件获取父组件传递过来的头像数据
    const pic = inject('pic')
    // reactive api
    let userInfo=reactive({userName:"小姐姐"});
    const setName = ()=>{
      let name = userInfo.userName == '小哥哥'?'小姐姐':'小哥哥'
      console.log(userInfo)

      // toRefs() 函数可以将 reactive() 创建出来的响应式对象，转换为普通的对象，
      // 就是可以將reactive多层对象类型的响应对象，转化为普通类型的响应数据
      // 但是 isRef 返回 false
      if(isReactive(userInfo)){
       userInfo =  {...toRefs(userInfo)}
      }

      // isRef api
      isRef(userInfo) ?userInfo.userName = name :userInfo.userName = '大魔王'
    }
    // ref api
    // ref用创建一个包装对象，只具备一个响应式属性value
    // 如果将对象指定为ref的值，该对象将被reactive方法深度遍历
    const city = ref('?');
    const setCity =()=>{
      // isRef api
      isRef(city) ? city.value = '杭州' : city.value = '城市'
    }

    // computed api
    const age = ref("30");
    //传入函数的方式
    const ageMsg = computed(() =>{
      return `我的年龄是:`+age.value
    })

    //传入对象自定义get set的形式
  //   const ageMsg = computed({
  //   get(){
  //     return `我的年龄是:`+age.value
  //   },
  //   set(val){
  //     age.value=val;
  //   }
  //  })

  // watch api
      //定义方式1 内部的响应对象改变就触发监听,默认会触发深度监听，
      //初始化的时候会执行一次
      //返回一个监听实例函数
       watchEffect(
       () => {
          console.log("我的年龄在变化:",age.value)
        },
        {
            lazy: false // 是否触发深度监听
       })

    // 监听单个对象
    watch(()=>age.value,(age,prevAge)=>{
      console.log("age:",age,"prevAge",prevAge)
    })
    // 监听多个对象
    watch([()=>age.value,()=>city.value],
    (
      [age,city],
      [prevage,prevcity]
    )=>{
      console.log("age:",age,"prevage",prevage)
      console.log("city:",city,"prevcity",prevcity)
    })


    return {
      userInfo,
      setName,
      city,
      setCity,
      age,
      ageMsg,
      stop,
      pic,
      getName
    }
  }
}
</script>
<template>
  <section>
    <section>
      <div>孙子组件</div>
      <img
        style="width:50px;height:50px"
        :src="pic"
      >
    </section>

    请输入地址:<input
      v-model="city"
      type="text"
    >
    请输入年龄:<input
      v-model="age"
      type="text"
    >
    <h2>我是:{{ userInfo.userName }},来自 {{ city }},今年{{ ageMsg }}</h2>
    <button @click="setName">
      setName
    </button>
    <button @click="setCity">
      where are you from?
    </button>
  </section>
</template>


