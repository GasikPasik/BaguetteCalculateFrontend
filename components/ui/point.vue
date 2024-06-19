<template>
  <div
    class="main-div-point"
    @mouseover="isLabelVisible = true"
    @mouseleave="isLabelVisible = false"
  >
    <img class="img-point" src="~/public/ico/point.svg" />
    <div class="div-point-label" v-show="isLabelVisible">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isLabelVisible = ref(false);
</script>

<style scoped>
:root {
  --main-color: red;
  --dark-grey-color: #333;
  --light-grey-color: #777;
}

.main-div-point {
  --w: 40px;
  width: var(--w);
  height: var(--w);
  background-color: var(--main-color);
  border-radius: 100%;
  position: relative;
  transform: translateX(0), translateY(0);
  transition: border-radius 0.1s ease-in-out, width 0.1s ease-in-out,
    height 0.1s ease-in-out, transform 0.1s ease-in-out;

  display: flex;
  justify-content: center;
  align-items: center;
}
.main-div-point:hover {
  --w: 50px;
  transform: translate(-8px, -8px);
}
.div-point-label {
  display: none;
  position: absolute;
  top: 50%;
  left: calc(var(--w) + 10px);
  transform: translateY(-50%);
  padding: 10px 10px;
  background-color: var(--dark-grey-color);
  color: white;
  border-radius: 5px;
  white-space: nowrap;
  font-size: 14px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  transition: opacity 0.1s ease-in-out;
}
.main-div-point:hover .div-point-label {
  display: block;
  opacity: 1;
}
.img-point {
  width: 24px;
}
</style>
