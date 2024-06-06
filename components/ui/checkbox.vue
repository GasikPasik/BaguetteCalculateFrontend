<template>
  <div class="checkbox" @click="toggleCheck">
    <div class="checkbox-inner" v-if="isChecked"></div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["toggle"]);
const isChecked = ref(false);

function toggleCheck() {
  isChecked.value = !isChecked.value;
  emit("toggle", isChecked.value);
}
</script>

<style scoped>
.checkbox {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  cursor: pointer;
  padding: 3px;

  border-radius: 2px;
}

.checkbox-inner {
  border-radius: 2px;
  width: 100%;
  height: 100%;
  background-color: var(--main-color);
}
</style>
