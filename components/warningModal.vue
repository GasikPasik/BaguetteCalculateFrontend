<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal-content">
      <h1 :style="{ color: 'var(--dark-grey-color)' }">{{ title }}</h1>
      <p class="error-body">{{ body }}</p>
      <div class="button-container">
        <CButton
          :style="{ marginTop: '20px', marginRight: '10px' }"
          @click="confirm"
          >Да</CButton
        >
        <CButton :style="{ marginTop: '20px' }" @click="cancel">Отмена</CButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import CButton from "~/components/ui/cbutton.vue";

const props = defineProps({
  title: {
    type: String,
    default: "Подтверждение",
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

const emit = defineEmits(["confirm", "cancel"]);

function confirm() {
  emit("confirm");
}

function cancel() {
  emit("cancel");
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
.button-container {
  display: flex;
  justify-content: center;
}
</style>
