<template>
  <div class="div-button-option">
    <slot></slot>
    <div class="div-button-right">
      <CButton @click="clicked">Выбрать</CButton>
    </div>
  </div>
</template>

<script setup>
import CButton from "~/components/ui/cbutton.vue";

const emit = defineEmits(["clicked"]);
function clicked() {
  emit("clicked");
}
</script>

<style scoped>
.div-button-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 30px;
  padding: 0 60px;
  color: white;
}
.div-button-right {
  display: flex;
  gap: 5px;
}
</style>
