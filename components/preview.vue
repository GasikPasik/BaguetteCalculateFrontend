<template>
  <div
    class="preview"
    ref="preview"
    :style="{
      width: limitW + 'px',
      height: limitH + 'px',
      '--bradius': wBaguette + 'px',
    }"
  >
    <div class="frame" :style="{ width: width + 'px', height: height + 'px' }">
      <div class="border-wrapper">
        <div
          v-if="frame.article"
          class="border top"
          :style="{
            backgroundImage:
              'url(' + backendUrl + '/static/' + frame.pattern1_path + ')',
          }"
        ></div>

        <div
          v-if="frame.article"
          class="border top bottom"
          :style="{
            backgroundImage:
              'url(' + backendUrl + '/static/' + frame.pattern1_path + ')',
          }"
        ></div>

        <div
          v-if="frame.article"
          class="border left"
          :style="{
            backgroundImage:
              'url(' + backendUrl + '/static/' + frame.pattern2_path + ')',
          }"
        ></div>

        <div
          v-if="frame.article"
          class="border left right"
          :style="{
            backgroundImage:
              'url(' + backendUrl + '/static/' + frame.pattern2_path + ')',
          }"
        ></div>
        <div class="content-container">
          <img
            class="content-image"
            :src="frame.urlImage === '' ? pathDefImage : frame.urlImage"
            :class="{ active: frame.isMirror === 0 }"
          />
          <div
            class="div-mirror"
            :class="{ active: frame.isMirror === 1 }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, onMounted, watch } from "vue";

const props = defineProps({ frame: { require: true } });
const { $api } = useNuxtApp();

const pathDefImage = useRuntimeConfig().public.pathDefImage;

const k = ref(0);
const limitW = ref(0);
const limitH = ref(0);
const width = ref(0);
const height = ref(0);
const wBaguette = ref(0);

const config = useRuntimeConfig();
const backendUrl = config.public.backendUrl;

const preview = ref(null);

function calculateSize(maxW, maxH) {
  wBaguette.value = Math.min(
    props.frame.width * (maxH / props.frame.h),
    props.frame.width * (maxW / props.frame.w)
  );
  k.value = Math.max(
    maxH / (wBaguette.value + maxH),
    maxW / (wBaguette.value + maxW)
  );
  limitW.value = maxW * k.value;
  limitH.value = maxH * k.value;
  wBaguette.value *= k.value;
  const aspectRatio = props.frame.w / props.frame.h;
  if (limitW.value / limitH.value > aspectRatio) {
    height.value = limitH.value;
    width.value = limitH.value * aspectRatio;
  } else {
    width.value = limitW.value;
    height.value = limitW.value / aspectRatio;
  }
}

const updateSize = () => {
  const parentElement = preview.value.parentElement;
  if (parentElement) {
    const parentWidth = parentElement.clientWidth;
    const parentHeight = parentElement.clientHeight;
    calculateSize(parentWidth, parentHeight);
  }
};

onMounted(() => {
  window.addEventListener("resize", updateSize);
  updateSize();
});

onUnmounted(() => {
  window.removeEventListener("resize", updateSize);
});
watch(
  () => [
    props.frame.path,
    props.frame.article,
    props.frame.w,
    props.frame.h,
    props.frame.width,
  ],
  () => {
    updateSize();
  }
);
</script>
<style scoped>
.preview {
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
}
.frame {
  opacity: 0.95;
}

.border-wrapper {
  height: 100%;
  overflow: visible;
  width: 100%;
  position: relative;
}

.content-container {
  width: 100%;
  height: 100%;
  z-index: -1;
}
.content-image {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
.border {
  position: absolute;
  background-repeat: repeat;
  z-index: 1;
}
.border.top {
  top: calc(-1 * var(--bradius));
  left: calc(var(--bradius) / -1);
  right: 0;
  height: var(--bradius);
  width: calc(100% + var(--bradius) * 2);
  background-size: auto 100%;
  clip-path: polygon(
    0% 0%,
    100% 0%,
    calc(100% - var(--bradius)) calc(100%+1px),
    var(--bradius) 100%
  );
}
.border.top.bottom {
  top: 100%;
  transform: rotate(180deg);
}
.border.left {
  bottom: 0;
  top: calc(var(--bradius) * -1);
  left: calc(var(--bradius) * -1);
  width: var(--bradius);
  height: calc(100% + var(--bradius) * 2 + 1px);
  background-size: 100% auto;

  clip-path: polygon(
    0% 0%,
    100% var(--bradius),
    100% calc(100% - var(--bradius)),
    0% 100%
  );
}
.border.right {
  left: 100%;
  transform: rotate(180deg);
}

.div-mirror {
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, #eeeeee, #c7c7c7);
  z-index: -1;
}
.div-mirror,
.content-image {
  opacity: 0%;
  transition: opacity 0.2s ease-in-out;

  position: absolute;
  top: 0;
  left: 0;
}
.div-mirror.active,
.content-image.active {
  opacity: 100%;
}
</style>
