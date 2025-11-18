<template>
  <div ref="container" class="w-full h-full"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import lottie from "lottie-web";

const props = defineProps({
  animationData: { type: Object, required: true },
  loop: { type: Boolean, default: true },
});

const container = ref(null);
let anim = null;

onMounted(() => {
  anim = lottie.loadAnimation({
    container: container.value,
    renderer: "svg",
    loop: props.loop,
    autoplay: true,
    animationData: props.animationData,
  });
});

onBeforeUnmount(() => {
  if (anim) anim.destroy();
});
</script>
