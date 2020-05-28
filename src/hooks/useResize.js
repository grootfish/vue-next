import { ref, onMounted, onUnmounted } from "vue";
export default () => {
  const width = ref(window.innerWidth); //默认值
  const height = ref(window.innerHeight); //默认值
  const onUpdate = () => {
    width.value =window.innerWidth;
    height.value = window.innerHeight;
  };
  onMounted(() => {
    window.addEventListener("resize", onUpdate);
  });
  onUnmounted(() => {
    window.removeEventListener("resize", onUpdate);
  });
  return {width,height}
};
