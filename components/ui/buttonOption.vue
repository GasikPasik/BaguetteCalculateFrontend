<template>
  <div class="div-button-option">
    <div class="label">
      <slot></slot>
      <template v-if="isCanBeActive">
        <p class="label-status" v-if="!isActive">Не выбрано</p>
        <p class="label-status active" v-else>Выбрано</p>
      </template>
    </div>
    <div class="div-button-right">
      <CButton @click="clicked">{{ text }}</CButton>
    </div>
  </div>
</template>

<script setup>
import CButton from "~/components/ui/cbutton.vue";

const props = defineProps({
  isCanBeActive: { default: true },
  isActive: { default: false },
  text: { default: "Выбрать" },
});

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
  user-select: none;
}
.div-button-right {
  display: flex;
  gap: 5px;
}

.label {
  display: flex;
  flex-direction: column;
}
.label-status {
  opacity: 60%;
  font-size: 15px;
}
.active {
  color: var(--main-color);
  opacity: 80%;
}
@media screen and (max-width: 500px) {
  .div-button-option {
    padding: 0 10px;
  }
}
</style>
