<template>
  <div class="main-content-div">
    <div class="preview">
      <Content :frame="frame" />
    </div>
    <div class="config">
      <Configuration :frame="frame" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import Configuration from "~/components/configuration.vue";
import Content from "~/components/content.vue";

const route = useRoute();
const config = useRuntimeConfig();
const pathDefImage = config.public.pathDefImage;

const emit = defineEmits(["changeZoom"]);

const frame = ref({
  w: 50,
  h: 50,
  options: [],
  optionsCost: 0,
  article: "3",
  costBaguette: 100,
  width: 3,
  urlImage: pathDefImage,
  isMirror: 0,
  path: "",
});

watch(
  () => frame.value.w,
  (newW, oldW) => {
    const maxSize = Math.max(frame.value.h, newW);
    emit("changeZoom", 120 - (maxSize / 250) * 100);
  }
);

watch(
  () => frame.value.h,
  (newH, oldH) => {
    const maxSize = Math.max(newH, frame.value.w);
    emit("changeZoom", 120 - (maxSize / 250) * 100);
  }
);
</script>

<style scoped>
.main-content-div {
  display: flex;
  overflow-y: hidden;
  height: 100%;
  width: 100%;
}
.preview {
  height: 100%;
  flex-grow: 1;
}
.config {
  width: 40%;
  min-width: 500px;
  max-width: 800px;
  height: 100%;
  background-color: var(--dark-grey-color);
  padding: 25px;
  overflow-y: scroll;
}
</style>
