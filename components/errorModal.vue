<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal-content">
      <h1 :style="{ color: 'var(--dark-grey-color)' }">{{ title }}</h1>
      <p class="error-body">{{ body }}</p>
      <CButton :style="{ marginTop: '20px' }" @click="closeModal"
        >Хорошо</CButton
      >
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";
import CButton from "~/components/ui/cbutton.vue";

const props = defineProps({
  title: {
    type: String,
    default: "Ошибка",
  },
  body: {
    type: String,
    required: true,
  },
  show: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["close"]);

function closeModal() {
  emit("close");
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
}
.error-body {
  font-family: "Inter", sans-serif;
}
</style>
