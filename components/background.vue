<template>
  <div class="bg-image" :style="backgroundStyle">
    <div class="bg-color" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

const props = defineProps({
  zoom: { default: 100 },
});

const offsetX = ref(0);
const offsetY = ref(0);

const backgroundStyle = computed(() => {
  const backgroundSize = `${props.zoom}%`;
  const backgroundPositionX = `calc(50% + ${offsetX.value}px)`;
  const backgroundPositionY = `calc(50% + ${offsetY.value}px)`;

  return {
    backgroundImage: `url(https://cdn.architextures.org/textures/22/8/stained-glassdawn-staggered-bespokeatelier-hvetko-1200.jpg)`,
    backgroundSize,
    backgroundPosition: `${backgroundPositionX} ${backgroundPositionY}`,
    transition: "background-size 0.2s ease, background-position 0.1s ease",
  };
});

const screenWidth = ref(1280);
const screenHeight = ref(720);

const updateOffset = (event) => {
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  const centerX = screenWidth.value / 2;
  const centerY = screenHeight.value / 2;

  const offsetXFactor = 0.015;
  const offsetYFactor = 0.02;

  offsetX.value = (mouseX - centerX) * offsetXFactor;
  offsetY.value = (mouseY - centerY) * offsetYFactor;
};

onMounted(() => {
  window.addEventListener("mousemove", updateOffset);

  const updateScreenSize = () => {
    screenWidth.value = window.innerWidth;
    screenHeight.value = window.innerHeight;
  };

  window.addEventListener("resize", updateScreenSize);

  onUnmounted(() => {
    window.removeEventListener("mousemove", updateOffset);
    window.removeEventListener("resize", updateScreenSize);
  });
});
</script>

<style scoped>
.bg-image {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
}
.bg-color {
  background-color: rgba(230, 230, 230, 0.8);
  width: 100%;
  height: 100%;
}
</style>
