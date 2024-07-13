<template>
  <NuxtLayout :zoom="zoomBackground">
    <NuxtPage @changeZoom="changeZoom" />
  </NuxtLayout>
</template>

<script setup>
const zoomBackground = ref(120 - (50 / 250) * 100);

function changeZoom(zoom) {
  zoomBackground.value = zoom;
}
</script>

<style></style>
