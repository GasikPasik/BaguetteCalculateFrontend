<template>
  <div class="checkbox" @click="toggleCheck">
    <div
      class="checkbox-inner"
      :class="{ active: isChecked, disable: !isChecked }"
    ></div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["toggle"]);
const props = defineProps({
  isChecked: {
    default: false,
  },
});
const isChecked = ref(props.isChecked);

function toggleCheck() {
  isChecked.value = !isChecked.value;
  emit("toggle", isChecked.value);
}
</script>

<style scoped>
.checkbox {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  cursor: pointer;
  padding: 3px;

  border-radius: 2px;
  box-shadow: 0px 0px 4px 1px rgba(10, 10, 10, 0.2) inset;

  transition: transform 0.1s ease-in-out;
  transform: scale(100%);
}
.checkbox:hover {
  transform: scale(110%);
}

.checkbox-inner {
  border-radius: 2px;
  width: 100%;
  height: 100%;
  background-color: var(--main-color);

  transition: transform 0.1s ease-in-out;
}
.checkbox-inner.active {
  transform: scale(100%);
}
.checkbox-inner.disable {
  transform: scale(0%);
}
</style>
