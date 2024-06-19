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
              'url(' +
              backendUrl +
              '/static/' +
              (frame.path == '' ? 'baguettes/' : frame.path) +
              frame.article +
              '_0.jpg)',
          }"
        ></div>

        <div
          v-if="frame.article"
          class="border top bottom"
          :style="{
            backgroundImage:
              'url(' +
              backendUrl +
              '/static/' +
              (frame.path == '' ? 'baguettes/' : frame.path) +
              frame.article +
              '_0.jpg)',
          }"
        ></div>

        <div
          v-if="frame.article"
          class="border left"
          :style="{
            backgroundImage:
              'url(' +
              backendUrl +
              '/static/' +
              (frame.path == '' ? 'baguettes/' : frame.path) +
              frame.article +
              '_90.jpg)',
          }"
        ></div>

        <div
          v-if="frame.article"
          class="border left right"
          :style="{
            backgroundImage:
              'url(' +
              backendUrl +
              '/static/' +
              (frame.path == '' ? 'baguettes/' : frame.path) +
              frame.article +
              '_90.jpg)',
          }"
        ></div>
        <div class="content-container">
          <img
            v-if="frame.isMirror == 0"
            class="content-image"
            :src="frame.urlImage"
          />
          <div v-else class="div-mirror"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const maxW = ref(500);
const maxH = ref(300);
import { defineProps, ref, onMounted, watch } from "vue";
const props = defineProps({ frame: { require: true } });
//   Math.min(
//     props.frame.width * (maxH / props.frame.h),
//     props.frame.width * (maxW / props.frame.w)
//   )
// );
const k = ref(0); //maxH / (wBaguette.value + maxH));
const limitW = ref(0); //maxW * k.value);
const limitH = ref(0); //maxH * k.value);
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

onMounted(() => {
  const parentElement = preview.value.parentElement;
  const parentWidth = parentElement.clientWidth;
  const parentHeight = parentElement.clientHeight;
  calculateSize(parentWidth, parentHeight);
});

watch(
  () => [props.frame.article, props.frame.w, props.frame.h],
  () => {
    const parentElement = preview.value.parentElement;
    const parentWidth = parentElement.clientWidth;
    const parentHeight = parentElement.clientHeight;
    calculateSize(parentWidth, parentHeight);
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
  /* background-color: var(--dark-grey-color); */
  opacity: 0.95;
}

.border-wrapper {
  height: 100%;
  overflow: visible;
  width: 100%;
  position: relative;
  -webkit-box-shadow: 0px 0px 10px 5px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0px 0px 10px 5px rgba(34, 60, 80, 0.2);
  box-shadow: 0px 0px 10px 5px rgba(34, 60, 80, 0.2);
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
}
</style>
