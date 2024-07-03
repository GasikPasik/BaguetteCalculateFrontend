<template>
  <div class="item-icon" :class="{ active: active }">
    <div class="over-image-div">
      <div
        class="image-div"
        @mousemove="updateMousePosition"
        @mouseleave="showDisc = false"
        @mouseenter="showDisc = true"
      >
        <slot></slot>
      </div>
    </div>
    <div class="text-block">
      <p class="label-item">{{ label }}</p>
      <p class="price-item">{{ price }} руб. м.</p>
    </div>
    <div
      v-if="showDisc && Object.keys(info).length > 0"
      class="description-tooltip"
      :style="{ top: mouseY + 'px', left: tooltipX + 'px' }"
    >
      <div v-for="(k, i) in Object.keys(info)" :key="i">
        <span :style="{ opacity: '70%' }">{{ k }}</span
        >: <span>{{ info[k] }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  active: { default: false },
  price: { default: 0.0 },
  label: { default: "None" },
  info: { default: {} },
});

const showDisc = ref(false);
const mouseX = ref(0);
const mouseY = ref(0);
const tooltipX = ref(0);

function updateMousePosition(event) {
  const tooltipWidth = 200;
  const padding = 10;
  mouseX.value = event.clientX + padding;
  mouseY.value = event.clientY + padding;

  if (event.clientX + tooltipWidth + padding > window.innerWidth) {
    tooltipX.value = event.clientX - tooltipWidth - padding;
  } else {
    tooltipX.value = event.clientX + padding;
  }
}
</script>

<style scoped>
.image-div {
  width: 100%;
  height: 100%;
  overflow: hidden;
  user-select: none;
}
.over-image-div {
  width: 150px;
  height: 150px;
  background-color: white;
  padding: 8px;
  border: 4px solid white;
  border-radius: 4px;
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out,
    background-color 0.2s ease-in-out;
}
.over-image-div.active {
  border: 4px solid var(--main-color);
  background-color: #f0f0f0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.text-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  margin-top: 5px;
  gap: 0px;
}

.label-item {
  font-size: 24px;
}
.price-item {
  opacity: 70%;
}
.item-icon {
  padding: 8px;
  color: white;
  cursor: pointer;
  border: 3px solid rgba(250, 250, 250, 0.1);
  transition: border-color 0.2s ease, color 0.2s ease, transform 0.1s ease,
    background-color 0.1s ease;
}
.item-icon.active {
  border: 3px solid var(--main-color);
  color: var(--main-color);
}
.item-icon:active {
  background-color: var(--main-color);
  color: white;
}

.description-tooltip {
  position: fixed;
  background-color: rgb(10, 10, 10);
  color: white;
  padding: 6px;
  border-radius: 3px;
  white-space: nowrap;
  z-index: 10;
  pointer-events: none;
  font-size: 16px;
  opacity: 85%;
}
</style>
