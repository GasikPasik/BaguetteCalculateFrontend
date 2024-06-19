<template>
  <div class="bagguete-image-div">
    <img
      :src="backendUrl + '/static/baguettes/' + article + '.jpg'"
      alt="Baguette"
      class="bagguete-image"
    />
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
const backendUrl = config.public.backendUrl;
const props = defineProps({ article: { default: "" } });
</script>

<style scoped>
.bagguete-image-div {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.bagguete-image {
  width: 100%;
  height: 100%;
  transform: translateY(35px) rotate(-45deg);
}
</style>
