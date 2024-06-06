<template>
  <div class="container" @mousemove="handleMouseMove">
    <Header />
    <div class="main-content-div">
      <div class="preview" :style="backgroundStyle">
        <Content :frame="frame" />
      </div>
      <div class="config">
        <Configuration :frame="frame" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import Header from "~/components/header.vue";
import Configuration from "~/components/configuration.vue";
import Content from "~/components/content.vue";

const route = useRoute();
const config = useRuntimeConfig();
const backendUrl = config.public.backendUrl;
const screenWidth = ref(0);
const screenHeight = ref(0);
const mouseX = ref(0);
const mouseY = ref(0);

const frame = ref({
  w: 50,
  h: 50,
  options: [],
  optionsCost: 0,
  article: "3",
  costBagguete: 100,
  wBaguette: 3,
  isPhoto: true,
  urlImage: backendUrl + "/static/def1.jpg",
});

const backgroundStyle = computed(() => {
  const maxSize = Math.max(frame.value.h, frame.value.w);
  const backgroundSize = `${120 - (maxSize / 250) * 100}%`;
  const backgroundPositionX =
    (screenWidth.value / 2 - mouseX.value) / 30 + "px";
  const backgroundPositionY =
    (screenHeight.value / 2 - mouseY.value) / 30 + "px";

  return {
    backgroundImage: `url(https://3djungle.ru/upload/resize_cache/iblock/f43/400_400_1/f4338ceb128889832da5361a6160c9ff.jpg)`,
    // backgroundImage: `url(https://cdn.discordapp.com/attachments/1222626149281042504/1248036134441713784/122_wicker_texture-seamless.jpg?ex=666233b9&is=6660e239&hm=27924d8b3a15671f2db3f9dbea7184839fff4d1884740fc664feb06c8d54e2d5&)`,
    backgroundSize,
    backgroundPosition: `${backgroundPositionX} ${backgroundPositionY}`,
    transition: "background-size 0.5s ease, background-position 0.1s ease",
  };
});

const handleMouseMove = (event: MouseEvent) => {
  mouseX.value = event.clientX;
  mouseY.value = event.clientY;
};

onMounted(() => {
  screenWidth.value = window.innerWidth;
  screenHeight.value = window.innerHeight;
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}
.main-content-div {
  display: flex;
  overflow-y: hidden;
  height: 100%;
}
.config {
  width: 800px;
  height: 100%;
  background-color: var(--dark-grey-color);
  padding: 25px;
  overflow-y: scroll;
}
.preview {
  height: 100%;
  width: 100%;
}
</style>
