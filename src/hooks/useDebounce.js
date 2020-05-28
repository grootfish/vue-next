import {customRef,} from "vue";
//只需要返回一个响应Ref对象，可自定义其get set
const useDebounce=(value='', delay = 2000)=>{
  //2000秒之后才会更新text的值
  return customRef((track, trigger) => {
    let timeout
    return {
      get() {
        track()//必须调用次函数才会触发更新
        return value
      },
      set(newValue) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          value = newValue
          trigger()//必须调用次函数才会触发更新
        }, delay)
      }
    }
 })
}

export default useDebounce
