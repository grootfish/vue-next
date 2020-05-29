import {customRef } from 'vue'
/**节流 */
function useThrottle(value, delay = 1000) {
  let timeout
  return customRef((track, trigger) => {
    return {
      get() {
        track();//必须调用次函数才会触发更新
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

export default useThrottle;
