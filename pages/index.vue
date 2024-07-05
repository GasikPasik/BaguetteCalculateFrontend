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
import Configuration from "~/components/configuration.vue";
import Content from "~/components/content.vue";

const emit = defineEmits(["changeZoom"]);

const frame = ref({
  w: 50,
  h: 50,

  options: {},
  optionsDepends: {},
  isChangeOptions: false,

  article: "",
  baguetteCost: 0,
  baguetteId: -1,
  width: 0,
  widthWQ: 0,

  urlImage: "",
  isMirror: 0,
  isOutside: 1,

  glassId: -1,
  glassCost: 0,

  path: "",
  count: 1,
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
  width: 35%;
  min-width: 500px;
  max-width: 600px;
  height: 100%;
  background-color: var(--dark-grey-color);
  padding: 25px;
  overflow-y: scroll;
}

@media screen and (max-width: 1200px) {
  .main-content-div {
    flex-direction: column;
  }
  .config {
    width: 100%;
    max-width: 100%;
    min-width: 100%;
  }
  .preview {
    height: 1500px;
  }
}
</style>
