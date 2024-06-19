<template>
  <div
    class="container"
    :style="{ width: '100%', height: '100%' }"
    @mousemove="handleMouseMove"
  >
    <Header />
    <slot></slot>
    <Background :zoom="zoom" />
  </div>
</template>
<script setup>
import Background from "~/components/background.vue";
import Header from "~/components/header.vue";

const props = defineProps({
  zoom: { default: 100 },
});
</script>
<style scoped>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
