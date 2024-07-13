<template>
  <div class="main-content-div">
    <div class="preview">
      <!-- <p>
        vot: {{ frame.passArtice_1 }} | {{ frame.passArtice_2 }} |
        {{ frame.pass_cuffix }}
      </p> -->
      <Content :frame="frame" />
    </div>
    <div class="config">
      <Configuration :frame="frame" />
    </div>
    <!-- <div
      v-for="i in 100"
      :style="{
        background: 'rgb(100,30,0)',
        height: '80px',
        width: '100%',
        marginTop: '20px',
      }"
    ></div> -->
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

  pass_cuffix: 0,

  passArtice_1: "",
  passCost_1: 0,
  passId_1: -1,
  passW_1: 0,
  passH_1: 0,
  passimage_1: "",

  passArtice_2: "",
  passCost_2: 0,
  passId_2: -1,
  passW_2: 0,
  passH_2: 0,
  passimage_2: "",

  urlImage: "",
  isMirror: 0,
  isInner: 1,

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
  width: 100%;
}
.preview {
  /* height: 100%; */
  flex-grow: 1;
}
.config {
  background-color: var(--dark-grey-color);
  padding: 25px;
}

/* @media screen and (max-width: 1200px) {
  .main-content-div {
    flex-direction: column;
  }
  .config {
    width: 100%;
    max-width: 100%;
    min-width: 100%;
  }
  .preview {
     height: 1300px;
  }
}  */

@media screen and (min-width: 500px) {
  .main-content-div {
    display: flex;
    overflow-y: hidden;
    height: 100%;
  }
  .config {
    width: 35%;
    min-width: 500px;
    max-width: 600px;
    height: 100%;
    overflow-y: scroll;
  }
}

@media screen and (max-width: 500px) {
  .config {
    width: 100%;
  }
  .preview {
    height: 100vh;
  }
}
</style>
