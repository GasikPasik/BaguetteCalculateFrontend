<template>
  <Header />
  <div class="over-container">
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
.over-container {
  width: 100%;
  padding-top: 58px;
}

@media screen and (min-width: 500px) {
  .over-container {
    overflow: hidden;
    height: 100%;
  }
}
</style>
