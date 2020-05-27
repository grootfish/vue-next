<script>
// @ is an alias to /src
import HelloWorld from '@/components/hello-world.vue';

export default {
	name: 'Home',
	components: {
		HelloWorld
	}
};
</script>
<template>
  <div class="home">
    <HelloWorld msg="Hello Vue Next" />
  </div>
</template>


